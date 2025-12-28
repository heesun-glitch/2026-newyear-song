export const config = {
    runtime: 'edge',
};

// [함수] 배열을 무작위로 섞어주는 함수
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ★★★ 최종 통합 데이터베이스 (총 205곡) ★★★
const SONG_DATABASE = [
    // ... (기존 데이터베이스 리스트 그대로 유지) ...
    { id: 1, title: "Welcome to the Show", artist: "DAY6 (데이식스)", tags: "시작, 무대, 주인공, 벅참, 환영" },
    { id: 2, title: "Live My Life", artist: "aespa", tags: "자유, 나만의 길, 여행, 팝펑크, 욜로" },
    // ... 중간 생략 ...
    { id: 205, title: "Dance The Night", artist: "Dua Lipa", tags: "바비, 댄스, 디스코, 신남" }
];

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { keyword, wish, isKorean } = await req.json(); 
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key not configured" }), { status: 500 });
        }

        // [1단계: 데이터 다이어트] 205개 중 랜덤으로 40개만 뽑아서 AI에게 던져줍니다.
        // 이렇게 하면 매번 후보군 풀이 달라져서 결과가 고착화되는 것을 막습니다.
        const shuffledDB = shuffleArray(SONG_DATABASE);
        const candidatePool = shuffledDB.slice(0, 40); 
        
        const dbString = JSON.stringify(candidatePool.map(s => ({ id: s.id, title: s.title, artist: s.artist, tags: s.tags })));
        
        const langInstruction = isKorean
            ? "3. Output Language: 'title', 'artist', 'reason' MUST be in **Korean**. (Reason should be warm and polite '해요체')"
            : "3. Output Language: 'title', 'artist', 'reason' MUST be in **English**. Translate the song title and artist to their official English names if they are in Korean.";

        // [2단계: 내부 경선 및 랜덤 선택] 
        // 프롬프트 핵심 변경: "Top 5를 뽑은 뒤, 그 중에서 반드시 'Random'하게 1개를 골라라"
        const finalPrompt = `
        Role: Music Recommendation Expert.
        
        [User Data]
        - Keyword: "${keyword}"
        - Wish: "${wish}"

        [Candidate Pool (Random subset of DB)]
        ${dbString}

        [Mission]
        1. First, analyze the pool and identify the **Top 5 candidates** that match the mood/keyword nicely.
        2. **CRITICAL STEP**: From those Top 5 candidates, **RANDOMLY PICK ONE (1) FINAL SONG**. 
           (Do not just pick the "best" match. Treat all 5 as equal and roll a dice to pick one.)
        3. Provide the JSON output for **ONLY that 1 Final Song**.
        
        [Important Rules]
        1. YOU MUST PICK FROM THE DATABASE provided above.
        2. The selection must be random among the top candidates to ensure diversity.
        ${langInstruction}
        4. Output ONLY JSON format with a single object.
        
        [Output Format]
        {
            "id": (number), 
            "title": "(Song title)",
            "artist": "(Artist name)",
            "reason": "(Reason for this song based on the wish, max 2 sentences)" 
        }
        `;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // 속도가 가장 빠른 모델 권장
                messages: [{ role: "user", content: finalPrompt }],
                temperature: 1.1, // 온도를 1.1로 조금 더 높여서 랜덤성을 강화했습니다.
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        
        let aiSelection;
        try {
            // AI가 1개만 주므로 바로 파싱
            const content = JSON.parse(data.choices[0].message.content);
            
            // 혹시 배열로 줬을 경우를 대비한 방어 코드
            if (content.candidates) {
                aiSelection = content.candidates[Math.floor(Math.random() * content.candidates.length)];
            } else {
                aiSelection = content;
            }

        } catch (e) {
            // 에러 시 풀에서 랜덤 선택
            aiSelection = candidatePool[Math.floor(Math.random() * candidatePool.length)];
            aiSelection.reason = isKorean ? "행운이 가득하시길!" : "Good luck!";
        }

        // DB에서 원본 데이터 찾기
        let selectedSong = SONG_DATABASE.find(s => s.id === aiSelection.id);
        if (!selectedSong) {
             // ID 매칭 실패 시 제목으로 찾거나 풀에서 첫번째 선택
            selectedSong = SONG_DATABASE.find(s => s.title === aiSelection.title) || candidatePool[0];
        }

        // [말버릇 강제 추가]
        const endingSuffix = isKorean ? " 허허" : " Huh-Huh";
        let reasonText = aiSelection.reason || (isKorean ? "새해 복 많이 받으세요." : "Happy New Year.");
        
        if (!reasonText.endsWith(endingSuffix.trim())) {
             if(reasonText.endsWith('.')) reasonText = reasonText.slice(0, -1);
             reasonText += endingSuffix;
        }

        let result = {
            title: selectedSong.title,
            artist: selectedSong.artist,
            reason: reasonText, 
            img_url: "record.png" 
        };

        // [이미지 검색] 1.5초 타임아웃 (속도 최적화)
        try {
            const fetchWithTimeout = (url, ms) => {
                const controller = new AbortController();
                const promise = fetch(url, { signal: controller.signal });
                const timeout = setTimeout(() => controller.abort(), ms);
                return promise.finally(() => clearTimeout(timeout));
            };

            const query = `artist:"${selectedSong.artist}" track:"${selectedSong.title}"`;
            let searchRes = await fetchWithTimeout(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`, 1500);
            
            if (searchRes.ok) {
                let searchData = await searchRes.json();
                if (searchData.data && searchData.data.length > 0) {
                    result.img_url = searchData.data[0].album.cover_xl;
                }
            }
        } catch (e) { 
            // 타임아웃 되거나 에러나면 기본 이미지 사용 (사용자 경험 보호)
            console.log("Image search skipped or failed");
        }

        return new Response(JSON.stringify({
            choices: [{ message: { content: JSON.stringify(result) } }]
        }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

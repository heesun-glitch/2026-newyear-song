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
    // ... (기존 데이터베이스 205개 그대로 유지하세요) ...
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

        // [수정 1] 데이터를 자르지 않고 '전체'를 다 쓰되, 순서만 섞습니다.
        // 이렇게 하면 소원과 맞는 노래가 절대 누락되지 않습니다.
        const shuffledDB = shuffleArray(SONG_DATABASE);
        
        // 전체 데이터를 문자열로 변환 (입력 토큰은 GPT-4o-mini에서 충분히 처리 가능)
        const dbString = JSON.stringify(shuffledDB.map(s => ({ id: s.id, title: s.title, artist: s.artist, tags: s.tags })));
        
        const langInstruction = isKorean
            ? "3. Output Language: 'title', 'artist', 'reason' MUST be in **Korean**. (Reason should be warm and polite '해요체')"
            : "3. Output Language: 'title', 'artist', 'reason' MUST be in **English**. Translate the song title and artist to their official English names if they are in Korean.";

        // [수정 2] 프롬프트: 전체 리스트에서 후보 5개를 찾고, 그 중 1개를 랜덤 선택
        const finalPrompt = `
        Role: Music Recommendation Expert.
        
        [User Data]
        - Keyword: "${keyword}"
        - Wish: "${wish}"

        [Song Database]
        ${dbString}

        [Mission]
        1. Scan the ENTIRE [Song Database] and identify the **Top 5 candidates** that best match the user's wish and keyword.
        2. **CRITICAL**: From those Top 5 candidates, **RANDOMLY PICK ONE (1) FINAL SONG**. 
           (Do not always pick the #1 best match. Roll a dice among the top 5 to ensure variety.)
        3. Provide the JSON output for **ONLY that 1 Final Song**.
        
        [Important Rules]
        1. YOU MUST PICK FROM THE DATABASE provided above.
        2. Connection between the wish and the song MUST be logical.
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
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: finalPrompt }],
                temperature: 1.0, 
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        
        let aiSelection;
        try {
            const content = JSON.parse(data.choices[0].message.content);
            if (content.candidates) {
                aiSelection = content.candidates[Math.floor(Math.random() * content.candidates.length)];
            } else {
                aiSelection = content;
            }
        } catch (e) {
            // 에러 발생 시 전체 DB에서 랜덤 선택 (안전장치)
            aiSelection = shuffledDB[Math.floor(Math.random() * shuffledDB.length)];
            aiSelection.reason = isKorean ? "행운이 가득하시길!" : "Good luck!";
        }

        // DB에서 원본 데이터 찾기
        let selectedSong = SONG_DATABASE.find(s => s.id === aiSelection.id);
        if (!selectedSong) {
            selectedSong = SONG_DATABASE.find(s => s.title === aiSelection.title) || SONG_DATABASE[0];
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

        // [수정 3] 이미지 검색 타임아웃을 3500ms(3.5초)로 넉넉하게 연장
        try {
            const fetchWithTimeout = (url, ms) => {
                const controller = new AbortController();
                const promise = fetch(url, { signal: controller.signal });
                const timeout = setTimeout(() => controller.abort(), ms);
                return promise.finally(() => clearTimeout(timeout));
            };

            const query = `artist:"${selectedSong.artist}" track:"${selectedSong.title}"`;
            // 3500ms로 변경하여 이미지를 불러올 시간을 충분히 줌
            let searchRes = await fetchWithTimeout(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`, 3500);
            
            if (searchRes.ok) {
                let searchData = await searchRes.json();
                if (searchData.data && searchData.data.length > 0) {
                    result.img_url = searchData.data[0].album.cover_xl;
                } else {
                     // 정확한 매칭 실패 시, 제목만으로 느슨한 검색 시도
                    let looseRes = await fetchWithTimeout(`https://api.deezer.com/search?q=${encodeURIComponent(selectedSong.title)}`, 3500);
                     if (looseRes.ok) {
                        let looseData = await looseRes.json();
                        if (looseData.data && looseData.data.length > 0) {
                             result.img_url = looseData.data[0].album.cover_xl;
                        }
                     }
                }
            }
        } catch (e) { 
            console.log("Image search timed out or failed:", e);
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

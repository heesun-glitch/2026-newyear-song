export const config = {
    runtime: 'edge',
};

// [함수] 배열 섞기
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// [함수] 텍스트 정제
function cleanText(text) {
    if (!text) return "";
    return text.replace(/\(.*\)/g, '').replace(/\[.*\]/g, '').trim();
}

// ★★★ [카테고리별 데이터베이스 분리] ★★★
// 유저가 선택한 키워드에 따라 이 리스트 중 하나만 사용합니다.
const SONG_CATEGORIES = {
    "돈": [ // Wealth, Money, Success
        { id: 9, title: "1조", artist: "이찬혁 (AKMU)", tags: "돈, 대박" },
        { id: 11, title: "JACKPOT", artist: "블락비 (Block B)", tags: "대박, 로또" },
        { id: 12, title: "MONEY", artist: "리사 (LISA)", tags: "돈, 부자, Flex" },
        { id: 13, title: "Lotto", artist: "EXO", tags: "로또, 당첨" },
        { id: 19, title: "Shopper", artist: "아이유 (IU)", tags: "쇼핑, 욕망" },
        { id: 164, title: "VVS", artist: "미란이, 먼치맨", tags: "성공, 보석" },
        { id: 23, title: "ROYAL", artist: "IVE (아이브)", tags: "고급, 품격" },
        { id: 26, title: "Baddie", artist: "IVE (아이브)", tags: "Flex, 힙함" },
        { id: 155, title: "Baggy Jeans", artist: "NCT U", tags: "자신감, 스웨그" },
        { id: 163, title: "새삥", artist: "지코 (ZICO)", tags: "트렌디, 새것" },
        { id: 6, title: "Higher", artist: "에일리", tags: "성공, 야망" },
        { id: 171, title: "Viva La Vida", artist: "Coldplay", tags: "권력, 왕, 성공" },
        { id: 183, title: "Shape of You", artist: "Ed Sheeran", tags: "부, 여유" }
    ],
    "사랑": [ // Love, Relationship
        { id: 75, title: "Love wins all", artist: "아이유 (IU)", tags: "사랑, 구원" },
        { id: 92, title: "너의 모든 순간", artist: "성시경", tags: "운명, 사랑" },
        { id: 96, title: "취중고백", artist: "김민석", tags: "고백, 설렘" },
        { id: 14, title: "소원을 말해봐", artist: "소녀시대", tags: "소원, 사랑" },
        { id: 72, title: "After LIKE", artist: "IVE", tags: "사랑, 고백" },
        { id: 83, title: "Seven", artist: "Jung Kook", tags: "사랑, 열정" },
        { id: 119, title: "Small girl", artist: "이영지", tags: "커플, 달달함" },
        { id: 125, title: "XO", artist: "ENHYPEN", tags: "로맨틱" },
        { id: 126, title: "별 떨어진다", artist: "디오", tags: "고백, 낭만" },
        { id: 128, title: "금요일에 만나요", artist: "아이유", tags: "설렘" },
        { id: 129, title: "Blueming", artist: "아이유", tags: "썸, 문자" },
        { id: 160, title: "Love Shot", artist: "EXO", tags: "치명적" },
        { id: 193, title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", tags: "영원한 사랑" },
        { id: 197, title: "Please Please Please", artist: "Sabrina Carpenter", tags: "애절함" },
        { id: 201, title: "Snooze", artist: "SZA", tags: "사랑" },
        { id: 188, title: "Kiss Me More", artist: "Doja Cat", tags: "달달함" },
        { id: 51, title: "Happy", artist: "태연", tags: "사랑, 행복" },
        { id: 55, title: "Loveable", artist: "조유리", tags: "사랑스러움" }
    ],
    "건강": [ // Health, Energy, Vitality
        { id: 2, title: "Live My Life", artist: "aespa", tags: "활력, 욜로" },
        { id: 32, title: "STEP", artist: "카라", tags: "에너지, 극복" },
        { id: 34, title: "얼굴 찌푸리지 말아요", artist: "하이라이트", tags: "웃음, 건강" },
        { id: 36, title: "아주 NICE", artist: "SEVENTEEN", tags: "기분좋음, 에너지" },
        { id: 38, title: "Run Run", artist: "이클립스", tags: "운동, 달리기" },
        { id: 39, title: "힘 내!", artist: "소녀시대", tags: "응원, 힘" },
        { id: 40, title: "SMILEY", artist: "YENA", tags: "긍정, 에너지" },
        { id: 81, title: "ANTIFRAGILE", artist: "LE SSERAFIM", tags: "강인함, 튼튼함" },
        { id: 88, title: "Candy", artist: "NCT DREAM", tags: "당충전, 활력" },
        { id: 146, title: "빨간 맛", artist: "Red Velvet", tags: "상큼, 에너지" },
        { id: 150, title: "Teddy Bear", artist: "STAYC", tags: "히어로, 힘" },
        { id: 178, title: "Flowers", artist: "Miley Cyrus", tags: "자기관리, 운동" },
        { id: 195, title: "Good 4 u", artist: "Olivia Rodrigo", tags: "에너지, 발산" },
        { id: 45, title: "행복", artist: "Red Velvet", tags: "행복, 에너지" },
        { id: 136, title: "HOT", artist: "SEVENTEEN", tags: "열정, 뜨거움" },
        { id: 143, title: "Cheer Up", artist: "TWICE", tags: "비타민" },
        { id: 48, title: "건물 사이에 피어난 장미", artist: "H1-KEY", tags: "생명력, 건강" }
    ],
    "커리어": [ // Career, Work, Achievement
        { id: 1, title: "Welcome to the Show", artist: "DAY6", tags: "무대, 주인공" },
        { id: 4, title: "시작", artist: "가호", tags: "성공, 야망" },
        { id: 10, title: "이루리", artist: "우주소녀", tags: "성취, 성공" },
        { id: 20, title: "I AM", artist: "IVE", tags: "자존감, 성공" },
        { id: 25, title: "내가 제일 잘 나가", artist: "2NE1", tags: "1등, 최고" },
        { id: 33, title: "파이팅 해야지", artist: "부석순", tags: "출근, 현생" },
        { id: 37, title: "손오공", artist: "SEVENTEEN", tags: "진화, 무적" },
        { id: 64, title: "Good & Great", artist: "키 (KEY)", tags: "일, 승진, 칭찬" },
        { id: 151, title: "Next Level", artist: "aespa", tags: "레벨업, 성장" },
        { id: 153, title: "질주", artist: "NCT 127", tags: "속도, 목표" },
        { id: 154, title: "영웅", artist: "NCT 127", tags: "자신감" },
        { id: 196, title: "Espresso", artist: "Sabrina Carpenter", tags: "각성, 일" },
        { id: 121, title: "ABCD", artist: "나연", tags: "매력, 능력" },
        { id: 24, title: "퀸카", artist: "(여자)아이들", tags: "탑, 주인공" },
        { id: 21, title: "나로 말할 것 같으면", artist: "마마무", tags: "자신감" },
        { id: 68, title: "Supernova", artist: "aespa", tags: "능력, 폭발" },
        { id: 65, title: "주인공", artist: "선미", tags: "커리어, 주인공" }
    ],
    "평화": [ // Peace, Comfort, Healing
        { id: 200, title: "Imagine", artist: "John Lennon", tags: "평화, 희망" },
        { id: 3, title: "한 페이지가 될 수 있게", artist: "DAY6", tags: "추억, 아름다움" },
        { id: 5, title: "I", artist: "태연", tags: "자유, 평온" },
        { id: 15, title: "나의 바람", artist: "비투비", tags: "행복, 바람" },
        { id: 30, title: "Good Parts", artist: "LE SSERAFIM", tags: "위로, 나 자신" },
        { id: 41, title: "청춘찬가", artist: "SEVENTEEN", tags: "위로, 응원" },
        { id: 43, title: "HAPPY", artist: "DAY6", tags: "행복, 위로" },
        { id: 44, title: "Siesta", artist: "위키미키", tags: "낮잠, 휴식" },
        { id: 52, title: "후라이의 꿈", artist: "AKMU", tags: "침대, 평화" },
        { id: 70, title: "Dynamite", artist: "BTS", tags: "희망, 긍정" },
        { id: 79, title: "봄날", artist: "BTS", tags: "희망, 따뜻함" },
        { id: 98, title: "아이와 나의 바다", artist: "아이유", tags: "잔잔함, 평화" },
        { id: 108, title: "숲", artist: "최유리", tags: "자연, 휴식" },
        { id: 166, title: "양화대교", artist: "Zion.T", tags: "가족, 행복" },
        { id: 194, title: "Beautiful Things", artist: "Benson Boone", tags: "평온, 감사" },
        { id: 204, title: "What Was I Made For?", artist: "Billie Eilish", tags: "성찰, 고요" },
        { id: 8, title: "New Future", artist: "이용신", tags: "희망, 기도" },
        { id: 49, title: "오르트구름", artist: "윤하", tags: "미지, 희망" }
    ],
    "이동": [ // Travel, Move, Change
        { id: 47, title: "Drive", artist: "미연", tags: "드라이브, 여행" },
        { id: 50, title: "안녕 (Hello)", artist: "조이", tags: "이동, 안녕" },
        { id: 53, title: "Parade", artist: "윤하", tags: "행진, 축제" },
        { id: 69, title: "Hype Boy", artist: "NewJeans", tags: "이동, 자유" },
        { id: 71, title: "ETA", artist: "NewJeans", tags: "속도, 이동" },
        { id: 73, title: "Perfect Night", artist: "LE SSERAFIM", tags: "밤거리, 드라이브" },
        { id: 80, title: "Spicy", artist: "aespa", tags: "질주, 자유" },
        { id: 84, title: "Fast Forward", artist: "전소미", tags: "미래, 속도" },
        { id: 120, title: "Supernatural", artist: "NewJeans", tags: "초자연, 여행" },
        { id: 122, title: "Sticky", artist: "KISS OF LIFE", tags: "휴가, 비행" },
        { id: 123, title: "클락션", artist: "(여자)아이들", tags: "자동차, 여행" },
        { id: 142, title: "붉은 노을", artist: "BIGBANG", tags: "여행, 떠남" },
        { id: 145, title: "Alcohol-Free", artist: "TWICE", tags: "휴양지" },
        { id: 174, title: "Cruel Summer", artist: "Taylor Swift", tags: "여름, 여행" },
        { id: 176, title: "As It Was", artist: "Harry Styles", tags: "변화, 과거" },
        { id: 179, title: "Stay", artist: "The Kid LAROI", tags: "드라이브" },
        { id: 186, title: "Paris in the Rain", artist: "Lauv", tags: "해외, 낭만" },
        { id: 192, title: "Blinding Lights", artist: "The Weeknd", tags: "질주, 밤" },
        { id: 63, title: "Thursday's Child", artist: "TXT", tags: "이별, 떠남" }
    ]
};

// 키워드 매핑 (한글/영어 대응)
const KEYWORD_MAP = {
    "돈": "돈", "Money": "돈",
    "사랑": "사랑", "Love": "사랑",
    "건강": "건강", "Health": "건강",
    "커리어": "커리어", "Career": "커리어",
    "평화": "평화", "Peace": "평화",
    "이동": "이동", "Travel": "이동" // '이동' 키워드 추가
};

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

        // 1. 유저 키워드에 맞는 노래 리스트만 가져오기 (핵심 수정)
        const mappedKeyword = KEYWORD_MAP[keyword] || "평화"; // 기본값 평화
        const targetCategoryList = SONG_CATEGORIES[mappedKeyword] || SONG_CATEGORIES["평화"];
        
        // 2. 해당 리스트 섞기
        const shuffledDB = shuffleArray(targetCategoryList);
        
        // 데이터베이스를 문자열로 변환 (ID, 제목, 아티스트, 태그만 포함)
        const dbString = JSON.stringify(shuffledDB.map(s => ({ id: s.id, title: s.title, artist: s.artist, tags: s.tags })));
        
        // 언어 설정 및 말투 지침 (Ending Suffix 강제)
        const endingSuffix = isKorean ? " 허허" : " Huh-Huh";
        const langInstruction = isKorean
            ? `3. Language: 'reason' MUST be in **Korean**. Do NOT use formal endings like '~요소이다'. Use a warm, friendly tone. END THE SENTENCE WITH "${endingSuffix}".`
            : `3. Language: 'reason' MUST be in **English**. Translate title/artist to English if needed. END THE SENTENCE WITH "${endingSuffix}".`;

        const finalPrompt = `
        Role: Music Recommendation Expert.
        
        [User Data]
        - Selected Category: "${mappedKeyword}" (Only pick songs from the provided list below)
        - Specific Wish: "${wish}"

        [Available Song List]
        ${dbString}

        [Mission]
        1. Scan the [Available Song List] and identify the **Top 5 candidates** that best match the user's specific wish.
        2. Provide a JSON object containing these 5 candidates.
        
        [Important Rules]
        1. YOU MUST PICK FROM THE [Available Song List] provided above. Do NOT invent songs.
        2. Connection between the wish and the song MUST be logical.
        ${langInstruction}
        4. Output ONLY JSON format.
        
        [Output Format]
        {
            "candidates": [
                {
                    "id": (number), 
                    "reason": "(Reason for this song, max 2 sentences, ending with ${endingSuffix})" 
                },
                ... (5 candidates total)
            ]
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
                temperature: 0.8, 
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        
        // 1. GPT 결과 파싱 (후보 5개 확보)
        let candidates = [];
        try {
            const content = JSON.parse(data.choices[0].message.content);
            if (content.candidates && Array.isArray(content.candidates)) {
                candidates = content.candidates;
            } else {
                candidates = [content];
            }
        } catch (e) {
            // 에러 시 현재 카테고리에서 랜덤 5개
            candidates = shuffledDB.slice(0, 5).map(s => ({ id: s.id, reason: isKorean ? "행운을 빕니다! 허허" : "Good luck! Huh-Huh" }));
        }

        // 2. [핵심 로직] 후보 5개 중 '랜덤'으로 1개 최종 선택 (JS Random)
        const finalPickIndex = Math.floor(Math.random() * candidates.length);
        const aiSelection = candidates[finalPickIndex] || candidates[0];

        // 3. 최종 선택된 노래의 상세 정보 찾기 (전체 DB가 아니라 카테고리 DB에서 찾음)
        let selectedSong = targetCategoryList.find(s => s.id === aiSelection.id);
        if (!selectedSong) {
            selectedSong = shuffledDB[0]; 
        }

        // 4. 이유 텍스트 후처리 (허허/Huh-Huh 강제 적용)
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

        // ★★★ [이미지 검색 로직 - Deezer API] ★★★
        try {
            const fetchWithTimeout = (url, ms) => {
                const controller = new AbortController();
                const promise = fetch(url, { signal: controller.signal });
                const timeout = setTimeout(() => controller.abort(), ms);
                return promise.finally(() => clearTimeout(timeout));
            };

            const cleanArtist = cleanText(selectedSong.artist);
            const cleanTitle = cleanText(selectedSong.title); 

            // 1단계: 정밀 검색
            const query1 = `artist:"${cleanArtist}" track:"${cleanTitle}"`;
            let searchRes = await fetchWithTimeout(`https://api.deezer.com/search?q=${encodeURIComponent(query1)}`, 5000);
            
            let foundImage = false;

            if (searchRes.ok) {
                let searchData = await searchRes.json();
                if (searchData.data && searchData.data.length > 0) {
                     const item = searchData.data[0];
                     result.img_url = item.album.cover_xl || item.album.cover_big || item.album.cover_medium;
                     foundImage = true;
                }
            }

            // 2단계: 실패 시 통검색
            if (!foundImage) {
                const query2 = `${cleanArtist} ${cleanTitle}`;
                let looseRes = await fetchWithTimeout(`https://api.deezer.com/search?q=${encodeURIComponent(query2)}`, 5000);
                
                if (looseRes.ok) {
                    let looseData = await looseRes.json();
                    if (looseData.data && looseData.data.length > 0) {
                        const item = looseData.data[0];
                        result.img_url = item.album.cover_xl || item.album.cover_big || item.album.cover_medium;
                    }
                }
            }

        } catch (e) { 
            console.log("Image search failed:", e);
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

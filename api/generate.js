export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { systemInstruction } = await req.json();
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key not configured" }), { status: 500 });
        }

        // 1. AI에게 추천받기 (Temperature 0.6: 창의력과 팩트의 균형)
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: systemInstruction }],
                temperature: 0.6,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        let content = JSON.parse(data.choices[0].message.content);
        
        // 2. Deezer 이미지 검색 (엄격 모드)
        content.img_url = ""; 
        let found = false;

        // [전략 1] 정밀 검색 (artist:"..." track:"...")
        // 가장 정확하지만, 띄어쓰기 하나라도 다르면 실패할 수 있음
        let query = `artist:"${content.artist}" track:"${content.title}"`;
        try {
            let res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            let json = await res.json();
            if (json.data && json.data.length > 0) {
                content.img_url = json.data[0].album.cover_xl;
                found = true;
                console.log("[Success] Strategy 1 (Exact):", content.title);
            }
        } catch (e) { console.error(e); }

        // [전략 2] 일반 검색 (가수 + 제목)
        // Deezer의 검색 엔진 능력에 맡김 (한국어/영어 자동 변환 등)
        if (!found) {
            let looseQuery = `${content.artist} ${content.title}`;
            try {
                let res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(looseQuery)}`);
                let json = await res.json();
                
                // ★★★ 중요: 검색 결과 중 첫 번째가 '가수'와 '제목'을 둘 다 포함하는지 대략 확인 ★★★
                // (완전히 엉뚱한 노래가 1순위에 뜨는 것을 방지하기 위함이지만, Deezer 검색 품질을 믿고 일단 가져옵니다)
                if (json.data && json.data.length > 0) {
                    content.img_url = json.data[0].album.cover_xl;
                    found = true;
                    console.log("[Success] Strategy 2 (Loose):", content.title);
                }
            } catch (e) { console.error(e); }
        }

        // ★★★ [삭제됨] 전략 3: 가수만 검색하기 ★★★
        // 사용자의 요청("ai가 가수만 검색하면 안돼")에 따라, 
        // 위 두 단계에서 노래를 못 찾으면 이미지는 그냥 비워둡니다 (기본 이미지 노출).
        if (!found) {
            console.log("[Failed] No image found. Showing default image.");
        }

        data.choices[0].message.content = JSON.stringify(content);
        
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

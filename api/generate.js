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

        // 1. AI에게 노래 추천받기
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: systemInstruction }],
                temperature: 1.0,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        let content = JSON.parse(data.choices[0].message.content);
        
        // 2. Deezer에서 이미지 검색 (AI가 준 건 가짜니까 무시하고 새로 찾음)
        content.img_url = ""; 

        // 전략 A: "가수 + 제목"으로 정확하게 검색
        const query = `${content.artist} ${content.title}`;
        try {
            let searchRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            let searchData = await searchRes.json();
            
            if (searchData.data && searchData.data.length > 0) {
                // 고화질(xl) 커버 이미지 사용
                content.img_url = searchData.data[0].album.cover_xl;
            } else {
                // 전략 B: 노래를 못 찾았다면 "가수 이름"으로라도 검색 (이미지 빈칸 방지)
                console.log("노래 검색 실패, 가수로 재검색");
                let artistRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(content.artist)}`);
                let artistData = await artistRes.json();
                if (artistData.data && artistData.data.length > 0) {
                    content.img_url = artistData.data[0].album.cover_xl;
                }
            }
        } catch (e) {
            console.error("Deezer search failed", e);
        }

        // 3. 수정된 데이터를 다시 포장해서 프론트엔드로 전달
        data.choices[0].message.content = JSON.stringify(content);
        
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

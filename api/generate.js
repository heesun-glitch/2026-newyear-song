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
        
        // 2. AI 응답에서 노래 제목과 가수 꺼내기
        let content = JSON.parse(data.choices[0].message.content);
        const query = `${content.artist} ${content.title}`;

        // 3. 실제 음악 DB(Deezer)에서 앨범 커버 검색하기 (키 필요 없음, 무료)
        try {
            const searchRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            const searchData = await searchRes.json();
            
            if (searchData.data && searchData.data.length > 0) {
                // 고화질 앨범 커버(xl)를 찾아서 AI가 만든 가짜 주소 대신 넣어줌
                content.img_url = searchData.data[0].album.cover_xl;
            }
        } catch (e) {
            console.error("Image search failed", e);
            // 실패하면 그냥 AI가 준 거 씀 (어쩔 수 없음)
        }

        // 4. 수정된 데이터를 다시 포장해서 프론트엔드로 전달
        data.choices[0].message.content = JSON.stringify(content);
        
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

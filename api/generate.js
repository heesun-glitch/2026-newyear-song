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

        // 1. AI에게 추천받기 (자유로운 분위기)
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: systemInstruction }],
                // ★★★ 창의력/공감 능력 최대치 (1.0) ★★★
                temperature: 1.0,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        let content = JSON.parse(data.choices[0].message.content);
        
        // 2. Deezer 이미지 매칭 (엄격하게 유지)
        content.img_url = ""; 
        
        // "가수와 제목이 둘 다 일치하는 것만 찾아라" (엉뚱한 사진 방지)
        const query = `artist:"${content.artist}" track:"${content.title}"`;
        
        try {
            let searchRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            let searchData = await searchRes.json();
            
            if (searchData.data && searchData.data.length > 0) {
                content.img_url = searchData.data[0].album.cover_xl;
            } else {
                // 정확한 매칭이 없으면 이미지를 비워둠 (차라리 기본 이미지가 뜨는 게 나음)
                console.log(`No exact match for: ${content.title} by ${content.artist}`);
            }
        } catch (e) {
            console.error("Deezer search failed", e);
        }

        data.choices[0].message.content = JSON.stringify(content);
        
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

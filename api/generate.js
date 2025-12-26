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

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: systemInstruction }],
                // ★★★ 수정됨: 0.6이 '센스'와 '정확도'의 균형점입니다 ★★★
                temperature: 0.6,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        let content = JSON.parse(data.choices[0].message.content);
        
        // 2. Deezer 정밀 검색 (가수와 제목이 정확히 일치해야 함)
        content.img_url = ""; 
        const query = `artist:"${content.artist}" track:"${content.title}"`;
        
        try {
            // advanced search 문법 사용
            let searchRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            let searchData = await searchRes.json();
            
            if (searchData.data && searchData.data.length > 0) {
                // 정확히 일치하는 앨범 커버 발견
                content.img_url = searchData.data[0].album.cover_xl;
            } else {
                console.log(`Deezer search failed for: ${content.title} - ${content.artist}`);
                // 이미지가 없으면 빈칸 -> 프론트에서 기본 이미지 처리 (엉뚱한 사진 방지)
            }
        } catch (e) {
            console.error(e);
        }

        data.choices[0].message.content = JSON.stringify(content);
        
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

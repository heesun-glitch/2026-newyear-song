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
                // ★★★ 창의력을 거의 제로로 만듭니다. 사실만 말하게 합니다. ★★★
                temperature: 0.2,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        let content = JSON.parse(data.choices[0].message.content);
        
        // 2. Deezer에서 "정밀" 이미지 검색
        content.img_url = ""; // 기본값 비워둠

        // ★★★ 핵심 변경: 정밀 검색 쿼리 사용 (artist:"" track:"") ★★★
        // 이렇게 해야 가수와 제목이 정확히 일치하는 앨범만 찾아냅니다.
        const query = `artist:"${content.artist}" track:"${content.title}"`;
        
        try {
            // advanced search를 위해 quotes로 감싸서 보냅니다.
            let searchRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            let searchData = await searchRes.json();
            
            if (searchData.data && searchData.data.length > 0) {
                // 정확한 매칭이 있으면 그 앨범의 고화질 커버를 사용
                content.img_url = searchData.data[0].album.cover_xl;
                console.log(`Found exact match on Deezer: ${content.title} by ${content.artist}`);
            } else {
                // ★★★ 핵심 변경: 가수만으로 재검색하는 '안전장치'를 제거했습니다. ★★★
                // 없는 노래면 차라리 이미지가 안 뜨는 게 낫습니다. 엉뚱한 이미지가 뜨는 원인입니다.
                console.log(`NO exact match found on Deezer for: ${content.title} by ${content.artist}. Image will be blank.`);
                // content.img_url은 빈 문자열("")로 유지됨 -> 프론트에서 기본 이미지 뜸
            }
        } catch (e) {
            console.error("Deezer search error", e);
        }

        // 3. 결과 반환
        data.choices[0].message.content = JSON.stringify(content);
        
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

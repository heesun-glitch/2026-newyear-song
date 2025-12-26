export const config = {
    runtime: 'edge',
    maxDuration: 10, // 타임아웃 방지 (검증하느라 시간이 좀 걸릴 수 있음)
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

        let verifiedContent = null;
        let attempts = 0;
        const MAX_RETRIES = 3; // 최대 3번까지 다시 시도

        // ★★★ 검증 루프 시작 ★★★
        while (attempts < MAX_RETRIES && !verifiedContent) {
            attempts++;
            console.log(`[Attempt ${attempts}] AI에게 노래 추천 요청 중...`);

            try {
                // 1. AI에게 추천받기
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [
                            { role: "user", content: systemInstruction },
                            // 재시도일 경우, 이전 답변과 다르게 하라고 힌트를 줄 수도 있음 (여기선 단순 반복)
                        ],
                        temperature: 0.7 + (attempts * 0.1), // 재시도할수록 창의력을 조금씩 높여서 다른 노래 유도
                        response_format: { type: "json_object" }
                    })
                });

                const data = await response.json();
                const content = JSON.parse(data.choices[0].message.content);
                
                console.log(`[Attempt ${attempts}] AI 추천: ${content.artist} - ${content.title}`);

                // 2. Deezer에서 실존 여부 검증 (Verification)
                // 가수 이름과 제목으로 검색해봅니다.
                const query = `${content.artist} ${content.title}`;
                const searchRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
                const searchData = await searchRes.json();

                // 3. 검증 판단
                if (searchData.data && searchData.data.length > 0) {
                    // ✅ 성공: 검색 결과가 있음!
                    // 검색된 첫 번째 곡이 우리가 찾던 곡과 유사한지(엉뚱한 곡 아닌지) 체크하면 더 좋지만,
                    // 일단 검색결과가 있다는 것만으로도 '실존 노래'일 확률이 매우 높음.
                    
                    content.img_url = searchData.data[0].album.cover_xl; // 이미지 확보
                    verifiedContent = content; // 검증된 콘텐츠 저장 -> 루프 탈출
                    console.log(`✅ 검증 성공! 이미지 확보 완료.`);
                } else {
                    // ❌ 실패: 검색 결과 0개 (없는 노래거나, 제목이 틀림)
                    console.warn(`❌ 검증 실패: Deezer에 없는 노래입니다. 다시 시도합니다.`);
                    // verifiedContent가 null이므로 루프가 다시 돕니다.
                }

            } catch (innerError) {
                console.error(`[Attempt ${attempts}] 에러 발생:`, innerError);
                // 에러 나도 다음 시도로 넘어감
            }
        }
        // ★★★ 루프 종료 ★★★


        if (verifiedContent) {
            // 성공한 데이터를 반환
            return new Response(JSON.stringify({
                choices: [{ message: { content: JSON.stringify(verifiedContent) } }]
            }), {
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // 3번 다 실패했을 경우 (정말 운이 나쁜 경우)
            // 에러를 띄우거나, 하드코딩된 '안전한 노래'를 보낼 수도 있습니다.
            // 여기서는 에러 메시지를 보냅니다.
            return new Response(JSON.stringify({ 
                error: "적절한 노래를 찾지 못했습니다. 다시 시도해주세요." 
            }), { status: 500 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { systemInstruction } = await req.json();
        
        // Vercel 설정에서 넣어둔 키를 여기서 몰래 꺼내 씁니다.
        const apiKey = process.env.OPENAI_API_KEY; 

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key not found" }), { status: 500 });
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
                temperature: 1.0,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = new Map();

export async function POST(req) {
  try {
    const { topic } = await req.json();
    console.log(" cache :", cache);
    if (cache.has(topic)) {
    console.log("Serving from cache");
    return NextResponse.json(cache.get(topic));
  }
    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
   You are an expert project recommender.
User wants to learn about "${topic}".
Suggest 3 to 5 project ideas in **pure JSON only**.
Do not include markdown, code blocks, or explanations.
JSON array format:
[
  {
    "title": "",
    "description": "",
    "techStack": [],
    "difficulty": "",
    "duration": "",
    "whatYouLearn": []
  }
]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to parse Gemini response as JSON
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (e) {
      jsonResponse = { rawText: text, error: "Invalid JSON from Gemini" };
    }



    return new Response(JSON.stringify(jsonResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getUserHistory } from "@/app/actions/historyActions";
import { auth } from "@clerk/nextjs/server";
const cache = new Map();

export async function POST(req) {
  try {
    const { userId } = await auth();
    const { topic } = await req.json();
    console.log(" cache :", cache);
    if (cache.has(topic)) {
      console.log("Serving from cache");
      return NextResponse.json(cache.get(topic));
    }
    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), { status: 400 });
    }
    const userHistory = await getUserHistory(userId);

    const titleList =
      userHistory.length > 0
        ? userHistory
          .map((item) => {
            const p = item.projectDetails;
            return `${p.title} (${p.techStack.join(", ")})`;
          })
          .join(", ")
        : "User has No recent learning history";


    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
   You are an expert project recommender.
    User wants to learn about "${topic}".User also has the following recent learning history: ${titleList}.
    ,
    Suggest 5 to 7 project ideas in **pure JSON only**.
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

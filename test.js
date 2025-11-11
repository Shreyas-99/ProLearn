import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const prompt = `
  Suggest 3 project ideas to learn the topic "React.js".
  Return only valid JSON with fields:
  title, description, tech_stack, backend_tech_stack, frontend_tech_stack, difficulty_level, duration, what_you_will_learn.
  `;
  
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

run();
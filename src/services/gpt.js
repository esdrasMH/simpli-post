import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_OPENAI_ID);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function obtenerSugerencias(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}

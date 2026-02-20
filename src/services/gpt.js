import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export async function obtenerSugerencias(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generando sugerencias:", error);
    throw error;
  }
}

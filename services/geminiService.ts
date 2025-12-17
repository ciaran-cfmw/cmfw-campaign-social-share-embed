import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCaption = async (baseCaption: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing");
    return baseCaption;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Reword the following social media campaign caption to make it sound fresh, urgent, and inspiring. Keep the hashtags. 
      
      Original: "${baseCaption}"
      
      Return ONLY the new caption text.`,
    });

    return response.text?.trim() || baseCaption;
  } catch (error) {
    console.error("Error generating caption:", error);
    return baseCaption;
  }
};
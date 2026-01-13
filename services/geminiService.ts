import { GoogleGenAI, Type } from "@google/genai";
import { EventDetails } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const refineEventContent = async (currentDetails: EventDetails): Promise<Partial<EventDetails> | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  const prompt = `
    You are a professional, high-end event planner for elite business clubs in China.
    Rewrite the following event introduction text to be more elegant, poetic (using appropriate Chinese idioms or sophisticated phrasing), and welcoming.
    Maintain the "Silk Road" (丝路) theme.
    
    Current Text: "${currentDetails.introText}"
    Current Title: "${currentDetails.title}"
    Location: "${currentDetails.venue.name}"

    Return the result as a JSON object with 'introText' and a suggested 'subtitle'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            introText: { type: Type.STRING },
            subtitle: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to refine content:", error);
    return null;
  }
};
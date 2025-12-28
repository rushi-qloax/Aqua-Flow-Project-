
import { GoogleGenAI } from "@google/genai";

/**
 * Service to fetch AI insights using the Google GenAI SDK.
 * Adheres to strict @google/genai initialization and usage guidelines.
 */
export const getAIResponse = async (userPrompt: string, role: string) => {
  try {
    // Always use the process.env.API_KEY directly in initialization as it's assumed valid and accessible.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Select gemini-3-flash-preview for general dashboard intelligence tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are NIKS-AI, an enterprise supply chain intelligence assistant for NIKS-AQUA. 
        The current dashboard user has the role: ${role}. 
        Developed by QLOAX Infotech. 
        Deliver succinct, professional, and actionable data-driven responses focusing on manufacturing logistics and inventory flow.`,
        temperature: 0.7,
      },
    });

    // Access .text property directly from the response object as per SDK guidelines.
    return response.text || "Operational data processing returned an empty node.";
  } catch (error) {
    console.error("NIKS-AI System Error:", error);
    return "Intelligence server sync failure. Check node connectivity and authorization.";
  }
};


import { GoogleGenAI } from "@google/genai";

// Fix: Initialize the client using the exact syntax and property access required by the Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (userPrompt: string, role: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are an AI Supply Chain Assistant for AquaFlow, a water manufacturing company. 
        The user is currently acting as a ${role}. 
        Provide professional, concise, and data-driven answers regarding logistics, inventory management, order statuses, and payments. 
        If the user asks about sensitive data not provided, offer to generate a general report.`,
        temperature: 0.7,
      },
    });

    // Fix: Use the .text property directly instead of calling it as a method
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The system is currently busy. Please try again later.";
  }
};
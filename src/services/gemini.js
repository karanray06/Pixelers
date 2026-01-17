import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeProblem(url) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      Analyze this DSA problem URL: ${url}
      Identify the following:
      1. Topic (e.g., Arrays, DP, Graphs)
      2. Difficulty (Easy, Medium, Hard)
      3. Core Concept tested
      
      Return ONLY a JSON object:
      {
        "topic": "Topic Name",
        "difficulty": "Difficulty",
        "concept": "Concept Description"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return {
            topic: "Unknown",
            difficulty: "Unknown",
            concept: "Manual Review Needed"
        };
    }
}

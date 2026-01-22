import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const analyzeProblem = async (url) => {
    try {
        const prompt = `Analyze this LeetCode/coding problem URL: ${url}. 
    Return a JSON object with: 
    {
      "topic": "Main Topic (e.g. Arrays, DP)",
      "difficulty": "Easy/Medium/Hard",
      "coreConcepts": ["Concept 1", "Concept 2"],
      "focusAreas": ["What to practice"]
    }
    Only return the JSON.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Basic cleanup to ensure JSON
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return null;
    }
};

export const chatWithMentor = async (history, message, context = "beginner") => {
    // History handling would go here, simplified for now
    const prompt = `You are an expert DSA mentor. The user is a ${context}.
    Question: ${message}
    Provide a helpful, guiding hint or explanation. Do not give the full code solution immediately unless asked.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

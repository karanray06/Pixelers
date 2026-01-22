import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeProblem(url) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
You are a DSA expert. Analyze this DSA problem URL and extract key information.
URL: ${url}

Identify the following:
1. Topic: The primary DSA topic (e.g., Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Hash Tables, Stacks, Queues, Heaps, Sorting, Binary Search, Strings, Backtracking, Greedy, Math, Bit Manipulation)
2. Difficulty: Rate as Easy, Medium, or Hard
3. Concept: A brief 1-2 sentence description of the core algorithmic concept tested

Return ONLY a valid JSON object with no markdown, no code blocks, no extra text:
{
  "topic": "Topic Name",
  "difficulty": "Easy|Medium|Hard",
  "concept": "Brief concept description"
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        try {
            return JSON.parse(cleanText);
        } catch (parseErr) {
            console.error("Parse error:", parseErr, "Text:", cleanText);
            // Fallback response
            return {
                topic: "General DSA",
                difficulty: "Medium",
                concept: "Complex algorithm problem requiring analysis"
            };
        }
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return {
            topic: "Unknown",
            difficulty: "Unknown",
            concept: "Manual Review Needed"
        };
    }
}

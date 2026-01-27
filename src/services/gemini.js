import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("⚠️ GEMINI API KEY NOT CONFIGURED. Set VITE_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY || "default-key");

// Extract problem info from URL for better analysis
function extractProblemInfo(url) {
    const urlLower = url.toLowerCase();
    let platform = "Unknown";

    if (urlLower.includes('leetcode')) platform = "LeetCode";
    else if (urlLower.includes('geeksforgeeks')) platform = "GeeksforGeeks";
    else if (urlLower.includes('codechef')) platform = "CodeChef";
    else if (urlLower.includes('hackerrank')) platform = "HackerRank";

    return { platform };
}

export async function analyzeProblem(url) {
    try {
        if (!url || url.trim().length === 0) {
            throw new Error("URL is empty");
        }

        // Validate URL format
        try {
            new URL(url);
        } catch {
            throw new Error("Invalid URL format");
        }

        console.log("🔍 Analyzing problem...", url);

        if (!API_KEY) {
            console.warn("⚠️ Using fallback analysis - API key not configured");
            return getFallbackAnalysis(url);
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a DSA expert. Analyze this DSA problem and extract information.
URL: ${url}

Based on the URL and domain, identify:
1. Topic: Primary DSA topic (Arrays, Linked Lists, Trees, Graphs, DP, Hash Tables, Stacks, Queues, Heaps, Sorting, Binary Search, Strings, Backtracking, Greedy, Math, Bit Manipulation, Recursion, Sliding Window)
2. Difficulty: Easy, Medium, or Hard (guess from URL pattern if possible)
3. Concept: 1-2 sentence description of the core concept

Return ONLY valid JSON (no markdown, no code blocks):
{"topic": "string", "difficulty": "Easy|Medium|Hard", "concept": "string"}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("✅ Gemini response:", text.substring(0, 100));

        // Clean up markdown code blocks if present
        const cleanText = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/json/g, '')
            .trim();

        try {
            const parsed = JSON.parse(cleanText);

            // Validate response
            if (parsed.topic && parsed.difficulty && parsed.concept) {
                console.log("✅ Analysis successful:", parsed);
                return parsed;
            } else {
                console.warn("⚠️ Invalid analysis format");
                return getFallbackAnalysis(url);
            }
        } catch (parseErr) {
            console.error("❌ Parse error:", parseErr.message, "Text:", cleanText);
            return getFallbackAnalysis(url);
        }
    } catch (error) {
        console.error("❌ Analysis Error:", error.message);
        return getFallbackAnalysis(url);
    }
}

function getFallbackAnalysis(url) {
    const { platform } = extractProblemInfo(url);

    console.log("📋 Using fallback analysis for", platform);

    return {
        topic: "Arrays",
        difficulty: "Medium",
        concept: platform + " problem requiring algorithmic analysis and optimization"
    };
}

export async function generateChatResponse(history, userInput) {
    try {
        if (!API_KEY) {
            return "I'm Pixeler, your AI mentor! (Note: API key not configured, using simulated response). How can I help you with DSA today?";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Format history for Gemini
        const chat = model.startChat({
            history: history.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(userInput);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("❌ Chat Generation Error:", error);
        throw error;
    }
}


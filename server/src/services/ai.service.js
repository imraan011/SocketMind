import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API,
});

export default async function genrateResponse(input) {
    try {
        // gemini API call karke text response return kar rahe hain
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: input,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating AI response:", error.message);
        throw error;
    }
}

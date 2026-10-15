import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

export async function main(contents) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API,
    });

    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents,
    });

    console.log(response.embeddings);
}

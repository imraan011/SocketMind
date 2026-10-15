import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

export async function genrateVectors(contents) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API,
    });

    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents,
        config: {
            outputDimensionality: 768,
        },
    });

    return response.embeddings[0].values;
}

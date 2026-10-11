import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
    apiKey: process.env.GROQ_API,
});
const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

export async function generateResponse(history) {
    const completion = await groq.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...history,
        ],
    });
    return completion.choices[0]?.message?.content || "";
}

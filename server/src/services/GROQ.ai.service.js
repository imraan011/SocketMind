import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
    apiKey: process.env.GROQ_API,
});
const model = process.env.GROQ_MODEL;

export async function generateResponse(history) {
    const completion = await groq.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system",
                content:
                    "you are a helping agent name imraan , your goal is used to povide info what user is asking always answer in short until the user do not demand it more about that",
            },
            ...history,
        ],
    });
    return completion.choices[0]?.message?.content || "";
}

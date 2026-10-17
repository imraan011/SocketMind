import { Server } from "socket.io";
import { parseCookie } from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { generateResponse } from "../services/GROQ.ai.service.js";
import { messageModel } from "../models/message.model.js";
import { genrateVectors } from "../services/embeddingai.service.js";
import { createMemory, queryMemory } from "../services/vector.service.js";

export function initSocketServer(httpServer) {
    //cors
    const io = new Server(httpServer, {
        cors: {
            origin: [
                process.env.CLIENT_URL || "http://localhost:5173",
                "http://localhost:5173",
                "http://127.0.0.1:5173",
            ],
            credentials: true,
        },
    });


    io.use(async (socket, next) => {
        const { token } = parseCookie(socket.handshake.headers?.cookie || " ");

        if (!token) {
            return next(new Error("unauthorised login required "));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await userModel.findById(decoded.id);
            socket.user = decoded;
            next();
        } catch (error) {
            next(new Error("Unauthorized: invalid token"));
        }
    });
    io.on("connection", (socket) => {
        socket.on("ai-message", async (messagePayload) => {
            //messagePayload = { chatId: "chatId", message: "user message" }

            const { chatId, message: prompt } = messagePayload || {};

            if (!prompt || !chatId) {
                return socket.emit("ai-response", {
                    message: "message aur chat id dono chahiye.",
                });
            }

            try {
                const [userMessage, vector] = await Promise.all([
                    messageModel.create({
                        chat: chatId,
                        user: socket.user.id,
                        content: prompt,
                        role: "user",
                    }),

                    genrateVectors(messagePayload.message),
                ]);

                const [memory, chatHistory] = await Promise.all([
                    queryMemory({
                        queryVector: vector,
                        limit: 5,
                        filter: {
                            user: String(socket.user.id),
                        },
                    }),

                    messageModel
                        .find({ chat: chatId, user: socket.user.id })
                        .sort({ createdAt: -1 })
                        .limit(11)
                        .lean(),
                ]);

                const stm = chatHistory.reverse().map((item) => ({
                    role: item.role === "system" ? "assistant" : item.role,
                    content: item.content,
                }));

                const ltm = [
                    {
                        role: "system",
                        content: `
                        Relevant previous memories from this user's conversation:
                        ${memory.map((item) => item.metadata.text).join("\n")}
                        Use these memories only when relevant to the current question.
                        `,
                    },
                ];
                const response = await generateResponse([...ltm, ...stm]);

                socket.emit("ai-response", { message: response });

                const [responseMessage, responseVectors] = await Promise.all([
                    messageModel.create({
                        chat: chatId,
                        user: socket.user.id,
                        content: response,
                        role: "system",
                    }),
                    genrateVectors(response),
                ]);

                await createMemory({
                    messageId: userMessage._id.toString(),
                    vector,
                    metadata: {
                        chatId: String(chatId),
                        user: String(socket.user.id),
                        text: prompt,
                    },
                });

                await createMemory({
                    messageId: responseMessage._id.toString(),
                    vector: responseVectors,
                    metadata: {
                        chatId: String(chatId),
                        user: String(socket.user.id),
                        text: response,
                    },
                });
            } catch (error) {
                console.log("Ai Error ", error.message);
            }
        });
    });
}

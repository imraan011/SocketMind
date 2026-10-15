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
            origin: process.env.CORS_ORIGIN || "http://localhost:5173",
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
                const userMessage = await messageModel.create({
                    chat: chatId,
                    user: socket.user.id,
                    content: prompt,
                    role: "user",
                });

                const vector = await genrateVectors(messagePayload.message);

                const memory = await queryMemory({
                    queryVector: vector,
                    limit: 5,
                    metadata: {
                        user: String(socket.user.id),
                        chatId: String(chatId),
                    },
                });

                await createMemory({
                    messageId: userMessage._id.toString(),
                    vector,
                    metadata: {
                        chatId: String(chatId),
                        user: String(socket.user.id),
                        text: prompt,
                    },
                });

                const chatHistory = await messageModel
                    .find({ chat: chatId, user: socket.user.id })
                    .sort({ createdAt: -1 })
                    .limit(11)
                    .lean();

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

                const responseMessage = await messageModel.create({
                    chat: chatId,
                    user: socket.user._id,
                    content: response,
                    role: "system",
                });

                const responseVectors = await genrateVectors(response);

                await createMemory({
                    messageId: responseMessage._id.toString(),
                    vector: responseVectors,
                    metadata: {
                        chatId: String(chatId),
                        user: String(socket.user.id),
                        text: response,
                    },
                });

                socket.emit("ai-response", { message: response });
            } catch (error) {
                console.log("Ai Error ", error.message);
            }
        });
    });
}

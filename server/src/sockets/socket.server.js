import { Server } from "socket.io";
import { parseCookie } from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { generateResponse } from "../services/GROQ.ai.service.js";
import { messageModel } from "../models/message.model.js";
import { genrateVectors } from "../services/embeddingai.service.js";
import { createMemory } from "../services/vector.service.js";

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
                await messageModel.create({
                    chatId,
                    user: socket.user.id,
                    content: prompt,
                    role: "user",
                });

                const chatHistory = await messageModel
                    .find({ chatId, user: socket.user.id })
                    .sort({ createdAt: -1 })
                    .limit(11)
                    .lean();

                const vector = await genrateVectors(messagePayload.message);
                await createMemory({
                    messageId: "846531",
                    vector,
                    metadata: {
                        chatId,
                        user: socket.user.id,
                    },
                });

                const messagesForAI = chatHistory.reverse().map((item) => ({
                    role: item.role === "system" ? "assistant" : item.role,
                    content: item.content,
                }));
                const response = await generateResponse(messagesForAI);

                await messageModel.create({
                    chatId,
                    user: socket.user.id,
                    content: response,
                    role: "system",
                });

                socket.emit("ai-response", { message: response });
            } catch (error) {
                console.log("Ai Error ", error.message);
            }
        });
    });
}

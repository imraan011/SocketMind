import { Server } from "socket.io";
import { parseCookie } from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { generateResponse } from "../services/GROQ.ai.service.js";
import { messageModel } from "../models/message.model.js";

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
        // socket.on("ai-message", async (message) => {
        //     // const text =
        //     //     typeof message === "string" ? message : message?.prompt;
        //     // console.log("user: ", text);

        //     const { chat, prompt } = message || {};
        //     console.log("user: ", prompt);

        //     try {
        //         await messageModel.create({
        //             chat: message.chat,
        //             user: socket.user._id,
        //             content: prompt,
        //             role: "user",
        //         });
        //         const response = await generateResponse([
        //             {
        //                 role: "user",
        //                 content: prompt,
        //             },
        //         ]);

        //         await messageModel.create({
        //             chat: message.chat,
        //             user: socket.user._id,
        //             content: response,
        //             role: "system",
        //         });

        //         console.log("AI: ", response);

        //         socket.emit("ai-response", { message: response });
        //     } catch (error) {
        //         console.log("Ai Error ", error);
        //     }
        // });
    socket.on("ai-message", async (message) => {
    console.log("raw message:", JSON.stringify(message));

    const prompt =
        typeof message === "string"
            ? message
            : message?.prompt ?? message?.content ?? message?.message;
    const chat = message?.chat;

    if (!prompt) {
        return socket.emit("ai-response", { message: "Empty message mila." });
    }

    try {
        await messageModel.create({ chat, user: socket.user.id, content: prompt, role: "user" });

        const response = await generateResponse([{ role: "user", content: prompt }]);

        await messageModel.create({ chat, user: socket.user.id, content: response, role: "system" });

        socket.emit("ai-response", { message: response });
    } catch (error) {
        console.log("Ai Error ", error.message);
    }
});
    });
}

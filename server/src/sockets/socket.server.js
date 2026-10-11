import { Server } from "socket.io";
import { parseCookie } from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { generateResponse } from "../services/GROQ.ai.service.js";

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
        socket.on("ai-message", async (message) => {
            const text =
                typeof message === "string" ? message : message?.prompt;
            console.log("user: ", text);
            try {
                const response = await generateResponse([
                    {
                        role: "user",
                        content: text,
                    },
                ]);
                console.log("ai: ", response);
                socket.emit("ai-response", { message: response });
            } catch (error) {
                console.log("Ai Error ", error);
            }
        });
    });
}

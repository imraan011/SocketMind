import { Server } from "socket.io";
import app from "./src/app.js";
import { createServer } from "http";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import { response } from "express";
import genrateResponse from "./src/services/ai.service.js";
import { log } from "console";

const httpserver = createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: "http://localhost:5173",
    }
});

//in built events two events are connection and disconnect
// connection event is fired when a new client connects to the server 
// disconnect event is fired when a client disconnects from the server

// custom events can be created by the developer and can be used to send and receive data between the client and server
io.on("connection", (socket) => {
    console.log("a user is connected");

    socket.on("disconnect", (socket) => {
        console.log("a user is disconnected");
    });



    const chatHistory = [];

    socket.on("ai-message", async (message) => {
        console.log("1. client:", JSON.stringify(message));

        chatHistory.push({
            role: "user",
            parts: [
                {
                    text: message,
                },
            ],
        });

        const reply = await genrateResponse(chatHistory);

        if (reply) {
            chatHistory.push({ role: "model", parts: [{ text: reply }] });
        } else {
            chatHistory.pop(); // fail hua to user ka message hata de
        }
        console.log("2. Gemini se reply:", reply);
        socket.emit("ai-message-response", {
            message: reply ?? "AI respond nahi kar paya.",
        }); s


    });
});

httpserver.listen(3000, () => {
    console.log("Server is running on port 3000");
});

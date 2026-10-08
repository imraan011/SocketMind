import genrateResponse from "./ai.service.js";

export const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        const chatHistory = [];

        socket.on("ai-message", async (message) => {
            console.log("1. Client Prompt:", JSON.stringify(message));

            chatHistory.push({
                role: "user",
                parts: [
                    {
                        text: message,
                    },
                ],
            });

            try {
                const reply = await genrateResponse(chatHistory);

                if (reply) {
                    chatHistory.push({
                        role: "model",
                        parts: [{ text: reply }],
                    });
                } else {
                    chatHistory.pop();
                }

                console.log("2. Gemini Response:", reply);
                socket.emit("ai-message-response", {
                    message: reply || "AI respond nahi kar paya.",
                });
            } catch (err) {
                console.error("Gemini Error:", err.message);
                chatHistory.pop();
                socket.emit("ai-message-response", {
                    message: "Error generating response: " + err.message,
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

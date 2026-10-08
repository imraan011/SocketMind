import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// Single persistent socket instance
export const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
});

export const sendAiMessage = (message) => {
    socket.emit("ai-message", message);
};

export const onAiMessageResponse = (callback) => {
    socket.on("ai-message-response", callback);
};

export const offAiMessageResponse = (callback) => {
    socket.off("ai-message-response", callback);
};

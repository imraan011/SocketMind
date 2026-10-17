import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// Single persistent socket instance
export const socket = io(SOCKET_URL, {
    transports: ["polling", "websocket"],
    autoConnect: true,
    withCredentials: true,
});

export const sendAiMessage = (message) => {
    socket.emit("ai-message", message);
};

export const onAiMessageResponse = (callback) => {
    socket.on("ai-response", callback);
};

export const offAiMessageResponse = (callback) => {
    socket.off("ai-response", callback);
};

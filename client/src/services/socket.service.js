import { io } from "socket.io-client";

const socket_url = io("http://localhost:3000");

export const socket = io(socket_url, {
    transports: ["websocket"],
    autoConnect: true,
});

export const sendAiMessage = (message) => {
    socket.emit("ai-message", message);
};

export const onAiMessageResponse = (callback) => {
    socket.on("ai-message-response", callback);
};

export const disconnectSocket = (cb) => {
    socket.disconnect("ai-message-response", cb);
};

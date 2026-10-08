import { Server } from "socket.io";
import app from "./src/app.js";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
import { initSocket } from "./src/services/socket.service.js";

const PORT = process.env.PORT || 3000;

// production me Vercel domain allow karna hai
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const httpserver = createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: CORS_ORIGIN,
    },
});

initSocket(io);

httpserver.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

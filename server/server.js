import { Server } from "socket.io";
import app from "./src/app.js";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
import { initSocket } from "./src/services/socket.service.js";
import connectDB from "./src/db/db.js";


//dns
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

//db connection
connectDB();





const PORT = process.env.PORT || 3000;

// production me Vercel domain allow karna hai
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const httpserver = createServer(app);

//cors
const io = new Server(httpserver, {
    cors: {
        origin: CORS_ORIGIN,
    },
});

//web socket
initSocket(io);

httpserver.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

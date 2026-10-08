import { Server } from "socket.io";
import app from "./src/app.js";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
import { initSocket } from "./src/services/socket.service.js";

const httpserver = createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: "http://localhost:5173",
    },
});

initSocket(io);

httpserver.listen(3000, () => {
    console.log("Server is running on port 3000");
});

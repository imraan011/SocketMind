import app from "./src/app.js";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/db/db.js";
import { initSocketServer } from "./src/sockets/socket.server.js";

//dns
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

//db connection
connectDB();

const PORT = process.env.PORT || 3000;

// production me Vercel domain allow karna hai

const httpserver = createServer(app);

//web socket
initSocketServer(httpserver);

httpserver.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

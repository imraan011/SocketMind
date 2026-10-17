import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";

const app = express();

// CORS middleware - cross-origin cookies aur credentials allow kar rahe hain
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);



export default app;

import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;

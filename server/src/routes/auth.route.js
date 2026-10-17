import express from "express";
import { loginUser, registerUser, getMe, logoutUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", authMiddleware, getMe);
authRouter.post("/logout", logoutUser);

export default authRouter;


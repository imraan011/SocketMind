import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createChat } from "../controllers/chat.controller.js";

const chatRouter = express.Router()

//protected routes
chatRouter.post("/" , authMiddleware , createChat )


export default chatRouter
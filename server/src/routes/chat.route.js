import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = express.Router()

//protected routes
chatRouter.post("/" , authMiddleware )


export default chatRouter
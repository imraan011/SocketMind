import { chatModel } from "../models/chat.model.js";

export async function createChat(req, res) {
    const { title } = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title,
    });

    res.status(201).json({
        message: "chat created successfully",
        chat: {
            _id: user._id,
            title: user.title,
            lastActivity: user.lastActivity,
            user: chat.user,
        },
    });
}

import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        lastActivity: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

export const chatModel = mongoose.model("chatModel", chatSchema);

import mongoose from "mongoose";

export default async function connectDB() {
    await mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("user connected to db");
        })
        .catch((err) => {
            console.log("DB connection error:", err.message);
        });
}

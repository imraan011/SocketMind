import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function authMiddleware(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(400).json({
            message: "unauthorize",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id || decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "unauthorized",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "unauthorized",
        });
    }
}

import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function authMiddleware(req, res, next) {
    const { token } = req.cookie;
    if (!token) {
        return res.status(400).json({
            message: "unauthorize",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            id: decoded._id,
        });

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "unauthorized",
        });
    }
}

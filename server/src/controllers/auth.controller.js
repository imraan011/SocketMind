import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User registration controller
export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;
        // fullname can be passed nested or flat; schema expects firstName & lastName
        const firstName = req.body.fullname?.firstName || req.body.fullname?.firstname || req.body.firstName || req.body.firstname;
        const lastName = req.body.fullname?.lastName || req.body.fullname?.lastname || req.body.lastName || req.body.lastname || "";

        if (!email || !password || !firstName) {
            return res.status(400).json({
                message: "Email, password and first name are required",
            });
        }

        // Check if user already exists in the database
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // password hash kar rahe hain
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullname: {
                firstName,
                lastName,
            },
            email,
            password: hashPassword,
        });

        // Generate JWT authentication token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                email: user.email,
                fullname: user.fullname,
                _id: user._id,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error during registration",
            error: error.message,
        });
    }
}

// User login controller
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Please enter valid password",
            });
        }

        // Generate JWT authentication token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "User login successful",
            user: {
                email: user.email,
                fullname: user.fullname,
                _id: user._id,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error during login",
            error: error.message,
        });
    }
}

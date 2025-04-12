import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ status: "fail", message: "User already exists" });
        }

        if (!req.body.username) {
            return res.status(400).json({ status: "fail", message: "Username required" });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });

        await newUser.save();
        return res.status(201).json({
            status: "success",
            message: "User registered successfully. Please log in.",
        });
    } catch (err) {
        console.error("Signup Error:", err.message);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
            return res.status(400).json({ message: "Username already exists" });
        }
        return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
};



const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email: Email });

        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(Password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "fail", message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, name: user.username, },
            process.env.SECRET_KEY,
            { expiresIn: "90d" }
        );

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 90 * 24 * 60 * 60 * 1000
        });


        // Send success response
        return res.status(201).json({
            status: "success",
            message: "User logged in successfully",
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
};
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    return res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
};

export default { signup, login, logout }
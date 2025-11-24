const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cookieOptions = {
    httpOnly: true,
    secure: true, // Set to true since you use HTTPS on render
    sameSite: 'None',
};

async function registerController(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists, please choose another"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await userModel.create({
            username,
            password: hashedPassword
        });

        // CHANGE: Do NOT set cookie here. Force user to login.
        res.status(201).json({
            message: "User created successfully. Please login."
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function loginController(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_Secret_Key,
            { expiresIn: '24h' } // Good practice to have expiry
        );

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            message: "User login successful",
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    registerController,
    loginController
};
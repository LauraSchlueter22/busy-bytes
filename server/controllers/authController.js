import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                error: 'Please provide name, email, and password'
            });
        }
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                error: 'Email already in use'
            });
        }
        const user = await User.create({
            name,
            email,
            password
        });
        const token = createToken(user._id);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error', error);
        res.status(500).json({
            error: 'Failed to create user'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                error: 'Please provide email and password'
            });
        }
        const user = await User
    } catch (error) {
        console.error('login failed');
        res.status(500).json({
            error: 'Failed to login'     
        });
    }
}
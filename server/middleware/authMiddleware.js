import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    try {
        let tocken;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) {
            return res.status(401).json({
                error: 'Not authorized. Please login.'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if(!user) {
            return res.status(401).json({
                error: 'User no longer exist'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);

        if(error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Invalid token. Please login again.'
            });
        }
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired. Please login again.'
            });
        }
        res.status(401).json({
            error: 'Not authorized'
        });
    }
};
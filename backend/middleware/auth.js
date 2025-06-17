const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        console.log('Auth Middleware: Received Token:', token);
        console.log('Auth Middleware: JWT_SECRET used for verification:', process.env.JWT_SECRET);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log('Auth Middleware: Decoded Token:', decoded);

        // Find user
        const user = await User.findById(decoded.user.id);
        console.log('Auth Middleware: User found:', user ? user._id : 'None');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        res.status(401).json({ message: 'Token is not valid or has expired' });
    }
};

module.exports = auth; 
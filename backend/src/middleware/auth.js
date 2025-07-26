const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'No token provided'
                }
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        // Add user info to request
        req.user = decoded;

        next();
    } catch (error) {
        logger.error('Authentication error:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Token expired'
                }
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid token'
                }
            });
        }

        return res.status(500).json({
            success: false,
            error: {
                message: 'Authentication error'
            }
        });
    }
};

module.exports = { authMiddleware }; 
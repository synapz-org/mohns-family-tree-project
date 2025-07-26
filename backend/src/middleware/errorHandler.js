const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    // Log the error
    logger.error('Error occurred:', {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    // Default error
    let error = {
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    };

    // Handle specific error types
    if (err.name === 'ValidationError') {
        error.status = 400;
        error.message = 'Validation Error';
        error.details = err.details;
    } else if (err.name === 'UnauthorizedError') {
        error.status = 401;
        error.message = 'Unauthorized';
    } else if (err.name === 'ForbiddenError') {
        error.status = 403;
        error.message = 'Forbidden';
    } else if (err.name === 'NotFoundError') {
        error.status = 404;
        error.message = 'Resource Not Found';
    } else if (err.name === 'ConflictError') {
        error.status = 409;
        error.message = 'Resource Conflict';
    }

    // Don't leak error details in production
    if (process.env.NODE_ENV === 'production' && error.status === 500) {
        error.message = 'Internal Server Error';
        error.details = undefined;
    }

    res.status(error.status).json({
        success: false,
        error: {
            message: error.message,
            ...(error.details && { details: error.details }),
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

module.exports = { errorHandler }; 
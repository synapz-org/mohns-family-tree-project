const notFoundHandler = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    error.name = 'NotFoundError';
    next(error);
};

module.exports = { notFoundHandler }; 
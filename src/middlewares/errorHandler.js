// src/middlewares/errorHandler.js

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error("Eis o erro: ", err.message);
    res.status(statusCode).json({
        message: err.message,
        errorCode: err.errorCode
    });
};

module.exports = errorHandlerMiddleware;

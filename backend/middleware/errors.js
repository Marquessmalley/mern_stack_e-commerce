const ErrorHandler = require("../utills/errorHandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // wrong mongoose object ID error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handle mongoose validation errors
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handle mongoose duplicate email error
    if (err.code == 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }
    // Handle wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invald!! Try again!";
      error = new ErrorHandler(message, 400);
    }
    // Handle Expire JWT error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired!! Try again!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

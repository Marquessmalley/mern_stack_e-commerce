// Error handler class

class ErrorHandler extends Error {
  construtor(message, statusCode) {
    super.Error(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

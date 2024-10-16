const Exception = require("./utils/Exception");

function globalErrorHandler(err, req, res, next) {
  const statusCode = err instanceof Exception ? err.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
  });
}

module.exports = globalErrorHandler;

const Exception = require('./utils/Exception');

function globalErrorHandler(err, req, res, next) {
  const statusCode = err instanceof Exception ? err.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

module.exports = globalErrorHandler;

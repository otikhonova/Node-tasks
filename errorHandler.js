const Exception = require('./utils/Exception'); 

function globalErrorHandler(err, req, res, next) {
  console.error('Global error handler:', err);

  res.status(err.statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

module.exports = globalErrorHandler;
function globalErrorHandler(err, req, res, next) {
    console.error('Global error handler:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
  
  module.exports = globalErrorHandler;
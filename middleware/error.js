const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // Log
  console.log(err.stack.red);

  // bad ObjectId
  if (err.name === 'CastError') {
    const message = `Cannot find resource id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Duplicated Key
  if (err.code === 11000) {
    const message = `Cannot submit duplicate of: ${err.keyValue.title}`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validators
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res .status(error.statusCode || 500)
      .json({
        success: false,
        error: error.message || `Server error`
      });
};

module.exports = errorHandler;
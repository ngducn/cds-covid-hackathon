const utilHelpers = {};

// Handle sending response object
utilHelpers.sendResponse = (res, statusCode, success, data, error, message) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (error) response.error = error;
  if (message) response.message = message;
  res.status(statusCode).json(response);
};

// Handle async function trycatch
utilHelpers.catchAsync = (func) => (req, res, next) => {
  func(req, res, next).catch((err) => next(err));
};

// Create Error type constructor to throw error
class AppError extends Error {
  constructor(statusCode, message, errorType) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.isOperational = true;
  }
}

utilHelpers.AppError = AppError;

module.exports = utilHelpers;

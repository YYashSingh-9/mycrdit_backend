const dotenv = require("dotenv");
const appError = require("../Utilities/appError");

// Specific production error handlers
const validationError = (error) => {
  const message = Object.values(error.errors).map((el) => el.message);
  return new appError(message, 500);
};
const handleDuplicateError = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Got a duplicate field here ${value}`;
  return new appError(message, 400);
};
const handleJWTError = () => {
  const message = "Invalid token , try again later.";
  return new appError(message, 400);
};
const handleJWTExpiredError = () => {
  const message = "Your valdation token expired try loging in again..";
  return new appError(message, 400);
};
const handleCastError = (error) => {
  const message = `Invalid ${error.path}:${error.value}`;
  return new appError(message, 400);
};

const developmentError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: "Fail",
    data: err,
    message: err.message,
    errorName: err.name,
  });
};

const productionError = (err, req, res) => {
  if (req.originalUrl.startsWith("/mycrdit")) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        data: err,
      });
    }
  }

  return res.status(500).json({
    status: "Fail",
    message: "Failed request.",
    data: err,
  });
};

module.exports = (err, req, res, next) => {
  const error = JSON.parse(JSON.stringify(err));
  error.message = err.message || "Failed request";
  error.statusCode = error.statusCode || 500;
  console.log(error);
  if (process.env.NODE_ENV === "development") {
    developmentError(error, req, res);
  }
  if (process.env.NODE_ENV === "production") {
    let err_or = { ...error };
    if (error.name === "CastError") err_or = handleCastError(err_or);
    if (error.name === "ValidationError") err_or = validationError(err_or);
    if (error.code === 11000) err_or = handleDuplicateError(err_or);
    if (error.name === "JsonWebTokenError") err_or = handleJWTError(err_or);
    if (error.name === "TokenExpiredError")
      err_or = handleJWTExpiredError(err_or);
    console.log(err_or);
    productionError(err_or, req, res);
  }
};


import AppError from '../utils/appErrors.js';

 const errorHandler=(err, req, res, _next) => {
  if (process.env.NODE_ENV == "production") {
    console.log(err);
  }
  // console.log(err.isOperational , err instanceof AppError)
  if (err.isOperational && err instanceof AppError) {
  return   res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "Error",
    message: "Something Went Wrong!",
  });
};
export default errorHandler;
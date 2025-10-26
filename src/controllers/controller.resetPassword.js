import userModel from "../models/model.user.js";
import AppError from "../utils/appErrors.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyEmailToken } from "../utils/emailVerificationToken.js";

const resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body;

  // 1️ Validate input
  if (!token || !newPassword) {
    throw new AppError("Token and new password are required", 400);
  }

  if (newPassword.length < 6) {
    throw new AppError("Password must be at least 6 characters long", 400);
  }

  // 2️ Verify token
  const decoded = await verifyEmailToken(token);
  if (!decoded || !decoded.userEmail) {
    throw new AppError("Invalid or expired token", 401);
  }

  // 3️ Find user
  const user = await userModel.findOne({ email: decoded.userEmail });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // 4️ Update password — pre('save') will hash it
  user.password = newPassword;
  await user.save();

  // 5️ Response
  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully. You can now log in.",
  });
});

export default resetPassword;

// controllers/verifyUser.js
import userModel from "../models/model.user.js";
import AppError from "../utils/appErrors.js";
import catchAsync from "../utils/catchAsync.js";
import {verifyEmailToken} from "../utils/emailVerificationToken.js";
import isUser from "../services/checkUser.js";


const verifyUser = catchAsync(async (req, res,next) => {
  const token = req.query.token;
  if (!token) throw new AppError("Token is missing", 400);

  // 1️ Decode and verify token
  const payload = await verifyEmailToken(token); // throws error if invalid/expired

  // 2️ Find user by email from payload
  const user = await isUser(payload.userEmail);
  if (!user) throw new AppError("User not found", 404);

  // 3️ Check if already verified
  if (user.isVerified) {
    return res.status(200).json({
      status: "success",
      message: "User is already verified",
    });
  }

  // 4️ Update user's verification status in DB
  const verifiedUser = await userModel.findOneAndUpdate(
    { email: user.email },
    { isVerified: true },
    { new: true }
  );

  if (!verifiedUser) {
    throw new AppError("Unable to verify user", 500);
  }

  // 5️ Send success response
  return res.status(200).json({
    status: "success",
    message: "User verified successfully",
    data: verifiedUser,
  });
});

export default verifyUser;

// controllers/controller.forgotPassword.js

import isUser from "../services/checkUser.js";
import AppError from "../utils/appErrors.js";
import catchAsync from "../utils/catchAsync.js";
import { verificationToken } from "../utils/emailVerificationToken.js";
import sendEmail from "../services/mailsender.js";

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // 1️ Validate input
  if (!email) {
    throw new AppError("Email is required", 400);
  }

  // 2️ Check if user exists
  const user = await isUser(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // 3️ Check if user is verified
  if (!user.isVerified) {
    throw new AppError(
      "User is not verified yet. Please verify your account first.",
      403
    );
  }

  // 4️ Generate reset token (valid for 1 hour)
  const token = await verificationToken(user.email);
  const resetURL = `${process.env.BASE_URL}/api/auth/reset-password?token=${token}`;

  // 5️ Compose email content
  const text = `You requested a password reset. Click the link below to reset your password:\n${resetURL}`;
  const html = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f7fa; padding: 40px; text-align: center;">
  <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); padding: 30px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Reset Password Icon" width="70" />
    </div>

    <h2 style="color: #333; font-size: 22px; margin-bottom: 15px;">Password Reset Request</h2>
    <p style="color: #555; font-size: 15px; line-height: 1.6;">
      You recently requested to reset your password. Click the button below to reset it.
    </p>

    <a href="${resetURL}"
       style="display:inline-block; margin-top: 20px; padding: 12px 25px; background-color:#007bff; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:500; font-size:15px;">
       🔒 Reset Password
    </a>

    <p style="margin-top: 25px; font-size: 14px; color: #666;">
      If the button above doesn’t work, copy and paste the following link into your browser:
    </p>

    <p style="word-break: break-all; font-size: 13px; color: #007bff;">
      <a href="${resetURL}" style="color:#007bff; text-decoration:none;">${resetURL}</a>
    </p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

    <p style="font-size: 12px; color: #999; line-height: 1.5;">
      If you did not request this password reset, you can safely ignore this email. Your password will remain unchanged.
    </p>

    <p style="font-size: 12px; color: #aaa; margin-top: 15px;">
      — The Security Team
    </p>
  </div>
</div>

  `;

  // 6️ Send email
  const emailResponse = await sendEmail(
    user.email,
    "Reset your password",
    text,
    html
  );

  if (!emailResponse) {
    throw new AppError("Unable to send password reset email", 500);
  }

  // 7️ Send response
  res.status(200).json({
    status: "success",
    message: "Password reset link sent successfully",
  });
});

export default forgotPassword;

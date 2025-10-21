import { compare } from "bcryptjs";
import isUser from "../services/checkUser.js";
import { accessTokenGenerator, refreshTokenGenerator } from "../utils/generateToken.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appErrors.js";

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1️ Validate input
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // 2️ Check if user exists
  const isRegisteredUser = await isUser(email);
  if (!isRegisteredUser) {
    throw new AppError("User does not exist. Please register first.", 404);
  }

  // 3️ Validate password
  const match = await compare(password, isRegisteredUser.password);
  if (!match) {
    throw new AppError("Invalid credentials. Please try again.", 401);
  }

  // 4️ Check email verification
  if (!isRegisteredUser.isVerified) {
    throw new AppError("Email not verified. Please verify your account before login.", 403);
  }

  // 5️ Generate tokens
  const refreshToken = await refreshTokenGenerator(isRegisteredUser.email);
  const accessToken = await accessTokenGenerator(isRegisteredUser.email);

  // 6️ Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // 7️ Success response
  res.status(200).json({
    success: true,
    message: "Login successful. Tokens stored in cookies.",
  });
});

export default login;

import catchAsync from "../utils/catchAsync.js";
import userModel from "../models/model.user.js";
import AppError from "../utils/appErrors.js";
import { accessTokenGenerator, verifyAccessToken, verifyRefreshToken } from "../utils/generateToken.js";

const refreshAcessToken = catchAsync(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // 1️ No tokens → block access
  if (!accessToken && !refreshToken) {
    throw new AppError("You are not logged in", 401);
  }

  let decodedAccess = null;
  let decodedRefresh = null;

  // 2️ Verify access token
  try {
    decodedAccess = verifyAccessToken(accessToken);
  } catch (err) {
    decodedAccess = null;
  }

  // 3️ Verify refresh token
  try {
    decodedRefresh = verifyRefreshToken(refreshToken);
  } catch (err) {
    decodedRefresh = null;
  }

  // 4️ Both tokens invalid → block
  if (!decodedAccess.success && !decodedRefresh.success) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    throw new AppError("Session expired. Please login again.", 401);
  }

  // 5️ Access token expired but refresh token valid → refresh access token
  if (!decodedAccess.success && decodedRefresh.success) {
    const user = await userModel.findById(decodedRefresh.userId);
    if (!user) throw new AppError("User not found", 404);

    const newAccessToken = await accessTokenGenerator(user.email);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    req.user = user;
    return next();
  }

  // 6️ Access token valid → allow access
  if (decodedAccess) {
    const user = await userModel.findById(decodedAccess.userId);
    if (!user) throw new AppError("User not found", 404);

    req.user = user;
    return next();
  }
});

export default refreshAcessToken;

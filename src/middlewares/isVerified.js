import AppError from "../utils/appErrors.js";
import isUser from "../services/checkUser.js";
import { verifyAccessToken } from "../utils/generateToken.js";
import catchAsync from "../utils/catchAsync.js";

const isVerified = catchAsync(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw new AppError("User not logged in", 401);

  const decodedUser = verifyAccessToken(accessToken);
  if (!decodedUser) throw new AppError("Invalid token. Please re-login.", 403);

  const user = await isUser(decodedUser.email);
  if (!user) throw new AppError("User not found. Please sign up first.", 404);

  if (!user.isVerified)
    return res.status(403).json({
      success: false,
      message: "User not verified. Please verify your email first.",
    });

  req.user = user;
  next();
});

export default isVerified;

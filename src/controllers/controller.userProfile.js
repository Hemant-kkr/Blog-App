import AppError from "../utils/appErrors.js";
import catchAsync from "../utils/catchAsync.js";

const getProfile = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new AppError("User not found", 401));
  }

  return res.status(200).json({
    success: true,
    data: {
      name: user.username,
      role: user.role,
      verificationStatus: user.isVerified,
      profile: user.profile,
    },
  });
});

export default getProfile;

import { verifyAccessToken, verifyRefreshToken } from "../utils/generateToken";

async function preventLoggedInAccess(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.cookies.accessToken;
    if (!refreshToken || !accessToken) {
      req.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      req.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      next();
    }
    const decodedAccess = verifyAccessToken(accessToken);
    if (!decodedAccess.success) {
      const decodedRefresh = verifyRefreshToken(refreshToken);
      if (decodedRefresh.success) {
        const token = "dcdwfwefewf";
        console(token);
      }
    }
    next();
  } catch (error) {
    console(error);
  }
}

export default preventLoggedInAccess;

// utils-: Tokens generations and Verifications 

import jwt from "jsonwebtoken";

function refreshTokenGenerator(user) {
  if (!user || user.isDeleted || user.isBlocked) {
    throw new Error(
      "User not found or inactive. Cannot generate refresh token."
    );
  }
  const payload = {
    userId: user._id,
  };
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
}

function accessTokenGenerator(user) {
  if (!user || user.isDeleted || user.isBlocked) {
    throw new Error(
      "User not found or inactive. Cannot generate access token."
    );
  }
  const payload = {
    userId: user._id,
    userEmail: user.email,
    role: user.role,
    isBlocked: user.isBlocked,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
}

function verifyRefreshToken(token) {
  if (!token) {
    return { success: false, error: "Token not found!" };
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return { success: true, decoded };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { success: false, error: "Refresh token has expired. Please login again." };
    } else if (error.name === "JsonWebTokenError") {
      return { success: false, error: "Invalid refresh token." };
    } else {
      return { success: false, error: "Failed to verify refresh token." };
    }
  }
}

function verifyAccessToken(token) {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { success: false, error: "Access token has expired. Please login again." };
    } else if (error.name === "JsonWebTokenError") {
      return { success: false, error: "Invalid Access token." };
    } else {
      return { success: false, error: "Failed to verify Access token." };
    }
  }
}


export {
  refreshTokenGenerator,
  accessTokenGenerator, 
  verifyRefreshToken,
  verifyAccessToken,
};
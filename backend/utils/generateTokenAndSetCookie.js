import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateAccessTokenAndSetCookie = (res, userId) => {
  const accessToken = jwt.sign({ userId }, ENV_VARS.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  return accessToken;
};

export const generateRefreshTokenAndSetCookie = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, ENV_VARS.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return refreshToken;
};

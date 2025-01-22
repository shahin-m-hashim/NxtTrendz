import {
  verifyAccessToken,
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";

export default async function authorize(req, res, next) {
  const { token, refreshToken } = req.cookies;

  const refreshTokens = () => {
    if (!refreshToken) {
      res.clearCookie("token");
      res.clearCookie("refreshToken");

      return res.status(401).json({
        data: null,
        success: false,
        error: "Invalid token.",
      });
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      const newAccessToken = createAccessToken(payload.sub);
      const newRefreshToken = createRefreshToken(payload.sub);

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: process.env.ENVIRONMENT === "production",
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.ENVIRONMENT === "production",
      });

      req.user = payload.sub;
      next();
    } catch (e) {
      res.clearCookie("token");
      res.clearCookie("refreshToken");

      return res.status(401).json({
        data: null,
        success: false,
        error: "Expired token.",
      });
    }
  };

  if (!token) {
    refreshTokens();
  } else {
    try {
      const payload = verifyAccessToken(token);
      req.user = payload.sub;
      next();
    } catch (error) {
      refreshTokens();
    }
  }
}

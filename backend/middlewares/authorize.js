import { verifyAccessToken } from "../utils/token.js";

export default async function authorize(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      data: null,
      success: false,
      error: "Invalid Authorization Header",
    });
  }

  try {
    const payload = verifyAccessToken(authHeader.split(" ")[1]);
    req.user = payload.sub;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        data: null,
        success: false,
        error: "Access token expired.",
      });
    } else {
      return res.status(401).json({
        data: null,
        success: false,
        error: "Invalid access token.",
      });
    }
  }
}

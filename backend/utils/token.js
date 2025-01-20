import jwt from "jsonwebtoken";

export const createAccessToken = (sub) => {
  return jwt.sign({ sub }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
    issuer: "http://localhost:8080",
    audience: "http://localhost:3000",
  });
};

export const createRefreshToken = (sub) => {
  return jwt.sign({ sub }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
    issuer: "http://localhost:8080",
    audience: "http://localhost:3000",
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
    issuer: "http://localhost:8080",
    audience: "http://localhost:3000",
  });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
    issuer: "http://localhost:8080",
    audience: "http://localhost:3000",
  });
};

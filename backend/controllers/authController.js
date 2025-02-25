import { hash } from "bcrypt";

import { environment } from "../server.js";
import { createAccessToken, createRefreshToken } from "../utils/token.js";
import { loginService, registerService } from "../services/authService.js";

export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await hash(password, 10);

    await registerService(username, hashedPassword);

    res.status(201).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        data: null,
        success: false,
        error: "User already exists",
      });
    }

    console.error("Error during registration:", e.message);

    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const sub = await loginService(username, password);

    const token = createAccessToken(sub);
    const refreshToken = createRefreshToken(sub);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: environment === "production",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: environment === "production",
    });

    res.status(200).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (e) {
    console.error("Error during login:", e.message);

    if (e.message === "Invalid credentials") {
      return res.status(401).json({
        data: null,
        success: false,
        error: "Invalid credentials",
      });
    }

    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({
    data: null,
    error: null,
    success: true,
  });
};

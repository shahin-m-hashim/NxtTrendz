import express from "express";

import {
  loginController,
  registerController,
  refreshTokensController,
} from "../controllers/authController.js";

import { sanitizeLogin, sanitizeRegister } from "../middlewares/sanitizer.js";

const authRoute = express.Router();

authRoute.post("/register", sanitizeRegister, registerController);

authRoute.post("/login", sanitizeLogin, loginController);

authRoute.post("/refresh", refreshTokensController);

export default authRoute;

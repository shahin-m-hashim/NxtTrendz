import { Router } from "express";

import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController.js";

import { sanitizeLogin, sanitizeRegister } from "../middlewares/sanitizer.js";

const authRoute = Router();

authRoute.post("/register", sanitizeRegister, registerController);

authRoute.post("/login", sanitizeLogin, loginController);

authRoute.get("/logout", logoutController);

export default authRoute;

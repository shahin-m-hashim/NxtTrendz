import express from "express";
import { validateRegister } from "../middlewares/validator.js";

import {
  loginController,
  registerController,
  refreshTokensController,
} from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/register", validateRegister, registerController);

authRoute.post("/login", loginController);

authRoute.post("/refresh", refreshTokensController);

export default authRoute;

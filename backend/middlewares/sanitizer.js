import { z } from "zod";
import { passwordSchema, usernameSchema } from "../models/user.js";

export const registerSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim().nonempty("Required."),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

export const loginSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
  })
  .strict();

export const sanitizeRegister = (req, res, next) => {
  try {
    req.body = registerSchema.parse(req.body);
    next();
  } catch (error) {
    console.log(error.issues);
    return res.status(400).json({
      data: null,
      success: false,
      error: "Invalid form data",
    });
  }
};

export const sanitizeLogin = (req, res, next) => {
  try {
    req.body = loginSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(401).json({
      data: null,
      success: false,
      error: "Invalid credentials",
    });
  }
};

import { z } from "zod";

const usernameSchema = z
  .string()
  .trim()
  .nonempty("Required.")
  .min(3, "At least 3 characters.")
  .max(30, "At most 30 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed.")
  .refine((val) => !/^\d+$/.test(val), {
    message: "Username cannot contain only numbers",
  });

const passwordSchema = z
  .string()
  .trim()
  .nonempty("Required.")
  .min(6, "At least 6 characters long.")
  .max(24, "At most 24 characters long.")
  .refine((val) => /[a-z]/.test(val), {
    message: "Only one lowercase letter.",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "At least one uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "At least one number",
  })
  .refine((val) => /[@$!%*?&]/.test(val), {
    message: "At least one special character",
  });

const registerSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim().nonempty("Required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const sanitizeRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      data: null,
      success: false,
      error: "Invalid form data",
    });
  }

  next();
};

export const sanitizeLogin = (req, res, next) => {
  const result = z
    .object({
      username: usernameSchema,
      password: passwordSchema,
    })
    .safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      data: null,
      success: false,
      error: "Invalid form data",
    });
  }

  next();
};

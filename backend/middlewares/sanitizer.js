import { z } from "zod";

const usernameSchema = z
  .string()
  .trim()
  .nonempty()
  .min(3)
  .max(30)
  .regex(/^(?!\d+$)/)
  .regex(/^[a-zA-Z0-9_]+$/);

const passwordSchema = z
  .string()
  .trim()
  .nonempty()
  .min(6)
  .max(24)
  .regex(/\d/)
  .regex(/[a-z]/)
  .regex(/[A-Z]/)
  .regex(/[@$!%*?&]/);

const registerSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim().nonempty("Required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
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
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(401).json({
      data: null,
      success: false,
      error: "Invalid credentials",
    });
  }

  next();
};

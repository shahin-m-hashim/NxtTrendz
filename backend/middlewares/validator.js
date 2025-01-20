import { z } from "zod";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.reduce((acc, err) => {
      const field = err.path.join(".");
      acc[field] = err.message;
      return acc;
    }, {});

    return res.status(400).json({ success: false, data: null, errors });
  }

  next();
};

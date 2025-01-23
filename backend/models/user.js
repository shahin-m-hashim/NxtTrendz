import { z } from "zod";
import { Schema, model } from "mongoose";

export const usernameSchema = z
  .string()
  .trim()
  .nonempty()
  .min(3)
  .max(30)
  .regex(/^(?!\d+$)[a-zA-Z0-9_]+$/);

export const passwordSchema = z
  .string()
  .trim()
  .nonempty()
  .min(6)
  .max(24)
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/);

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

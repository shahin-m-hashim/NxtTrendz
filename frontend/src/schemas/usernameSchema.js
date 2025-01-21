import { z } from "zod";

const usernameSchema = z
  .string()
  .nonempty("Required.")
  .min(3, "At least 3 characters.")
  .max(30, "At most 30 characters.")
  .regex(/^(?!\d+$)/, "Username cannot contain only numbers")
  .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed.");

export default usernameSchema;

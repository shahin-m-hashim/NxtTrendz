import { compare } from "bcrypt";
import User from "../models/user.js";

export const registerService = async (username, password) => {
  const user = await User.create({ username, password });
  console.log(`User created: ${user.id}`);
};

export const loginService = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) throw new Error("Invalid credentials");

  const isValid = await compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return {
    id: user.id,
    username: user.username,
  };
};

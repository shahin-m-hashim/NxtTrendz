import api from "api/axiosConfig";

export const loginUser = async ({ username, password }) => {
  try {
    await api.post("/auth/login", { username, password });
  } catch (e) {
    throw new Error(e.response?.data?.error || "Invalid credentials.");
  }
};

export const registerUser = async ({ username, password, confirmPassword }) => {
  try {
    await api.post("/auth/register", {
      username,
      password,
      confirmPassword,
    });
  } catch (e) {
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

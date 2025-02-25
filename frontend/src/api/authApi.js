import delay from "utils/delay";
import api from "config/axiosConfig";

export const loginUser = async ({ username, password }) => {
  try {
    await delay();
    await api.post("/auth/login", { username, password });
    localStorage.setItem("isAuthenticated", true);
  } catch (e) {
    throw new Error(e.response?.data?.error || "Invalid credentials.");
  }
};

export const registerUser = async ({ username, password, confirmPassword }) => {
  try {
    await delay();
    await api.post("/auth/register", {
      username,
      password,
      confirmPassword,
    });
  } catch (e) {
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

export const logoutUser = async () => {
  try {
    await delay();
    await api.get("/auth/logout");
  } catch (e) {
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

import api from "api/axiosConfig";
import useStore from "store/_store";

export const loginUser = async ({ username, password }) => {
  try {
    const res = await api.post("/auth/login", { username, password });
    useStore.getState().login(res.data?.data);
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

    useStore.getState().resetForm("register");
  } catch (e) {
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

export const logoutUser = async () => {
  try {
    await api.get("/auth/logout");
    useStore.getState().logout();
  } catch (e) {
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

export const testApi = async () => {
  try {
    await api.get("/test");
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

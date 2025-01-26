import api from "api/axiosConfig";
import useStore from "store/_store";

export const getProducts = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const res = await api.get(`/products${window.location.search}`);
    return res.data?.data.products;
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

export const getProduct = async (id) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const res = await api.get(`/products/${id}`);
    return res.data?.data;
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

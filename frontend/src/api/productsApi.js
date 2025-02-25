import delay from "utils/delay";
import api from "config/axiosConfig";
import resetAll from "utils/resetAll";

export const getProducts = async (
  rating = 0,
  search = "",
  sortBy = "",
  category = ""
) => {
  try {
    await delay();
    const queryString = `?search=${search}&category=${category}&rating=${rating}&sort_by=${sortBy}`;
    const res = await api.get(`/products${queryString}`);
    return res.data?.data.products;
  } catch (e) {
    if (e.response?.status === 401) resetAll();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

export const getProduct = async (id) => {
  try {
    await delay();
    const res = await api.get(`/products/${id}`);
    return res.data?.data;
  } catch (e) {
    if (e.response?.status === 401) resetAll();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

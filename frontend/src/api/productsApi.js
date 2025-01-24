import api from "api/axiosConfig";
import useStore from "store/_store";

export const getProducts = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const res = await api.get(`/products${window.location.search}`);

    const products = res.data?.data;
    useStore.getState().setProducts(products.products);
    return products;
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

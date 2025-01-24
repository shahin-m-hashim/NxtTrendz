import { getQueryParams } from "utils/queryParams";

const createProductsSlice = (set) => {
  return {
    products: {
      items: null,
      isSearchDebouncing: false,
      searchKeyword: getQueryParams().search || "",
    },

    setProducts: (products) =>
      set(
        (state) => {
          state.products.items = products;
          if (state.products.isSearchDebouncing) {
            state.products.isSearchDebouncing = false;
          }
        },
        undefined,
        "setProducts"
      ),

    setProductsSearchKeyword: (searchKeyword) =>
      set(
        (state) => {
          state.products.isSearchDebouncing = true;
          state.products.searchKeyword = searchKeyword;
        },
        undefined,
        "setProductsSearchKeyword"
      ),
  };
};

export default createProductsSlice;

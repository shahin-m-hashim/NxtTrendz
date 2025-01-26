const createProductsSlice = (set) => ({
  products: {
    total: 0,
    items: null,
    isSearching: false,
  },

  setProducts: (products) =>
    set(
      (state) => {
        state.products.items = products;
        state.products.isSearching = false;
        state.products.total = products.length;
      },
      undefined,
      "setProducts"
    ),

  setIsSearchingProduct: (isSearching) =>
    set(
      (state) => {
        state.products.isSearching = isSearching;
      },
      undefined,
      "setIsSearching"
    ),
});

export default createProductsSlice;

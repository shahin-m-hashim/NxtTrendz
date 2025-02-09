const createProductsSlice = (set) => ({
  products: {
    total: 0,
    items: null,
  },

  setProducts: (products) =>
    set(
      (state) => {
        state.products.items = products;
        state.products.total = products.length;
      },
      undefined,
      "setProducts"
    ),
});

export default createProductsSlice;

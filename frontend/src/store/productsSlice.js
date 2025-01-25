const createProductsSlice = (set) => ({
  products: {
    cart: {},
    total: 0,
    item: null,
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

  setProduct: (product) =>
    set(
      (state) => {
        state.products.item = product;
      },
      undefined,
      "setProduct"
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

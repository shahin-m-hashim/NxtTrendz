const createProductSlice = (set) => ({
  productSlice: {
    product: null,
    isInCart: false,
    quantityInCart: 0,
    quantityToAddInCart: 0,
  },

  setProduct: (product) =>
    set(
      (state) => {
        state.productSlice.product = product;

        const productInCart = state.cartSlice.cart.find(
          (p) => p.id === product._id
        );

        if (productInCart) {
          state.productSlice.isInCart = true;
          state.productSlice.quantityInCart = productInCart.quantity;
          state.productSlice.quantityToAddInCart = productInCart.quantity;
        } else {
          state.productSlice.isInCart = false;
          state.productSlice.quantityInCart = 0;
          state.productSlice.quantityToAddInCart = 0;
        }
      },
      undefined,
      "setProduct"
    ),

  increaseProductQuantityToAddInCart: () =>
    set(
      (state) => {
        if (
          state.productSlice.product &&
          state.productSlice.quantityToAddInCart <
            state.productSlice.product.remaining
        ) {
          state.productSlice.quantityToAddInCart++;
        }
      },
      undefined,
      "increaseProductQuantityToAddInCart"
    ),

  decreaseProductQuantityToAddInCart: () =>
    set(
      (state) => {
        if (state.productSlice.quantityToAddInCart > 0) {
          state.productSlice.quantityToAddInCart--;
        }
      },
      undefined,
      "decreaseProductQuantityToAddInCart"
    ),
});

export default createProductSlice;

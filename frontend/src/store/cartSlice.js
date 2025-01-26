const initialState = {
  cart: [],
  totalPrice: 0,
  totalProducts: 0,
};

const initialCartSlice =
  JSON.parse(localStorage.getItem("cart")) || initialState;

const createCartSlice = (set) => {
  return {
    cartSlice: initialCartSlice,

    addProductToCart: () =>
      set(
        (store) => {
          const product = store.productSlice.product;
          const quantity = store.productSlice.quantityToAddInCart;

          if (!product || quantity <= 0) return;

          const { _id, image_url, title, brand, price } = product;

          store.cartSlice.cart.push({
            title,
            brand,
            id: _id,
            quantity,
            image_url,
            price: price,
            totalPrice: price * quantity,
          });

          store.productSlice.isInCart = true;
          store.cartSlice.totalProducts += quantity;
          store.productSlice.quantityInCart = quantity;
          store.cartSlice.totalPrice += price * quantity;

          localStorage.setItem("cart", JSON.stringify(store.cartSlice));
        },
        undefined,
        "addProductToCart"
      ),

    removeProductFromCart: (id) =>
      set(
        (state) => {
          const { price, quantity } = state.cartSlice.cart.find(
            (p) => p.id === id
          );

          state.cartSlice.totalProducts -= quantity;
          state.cartSlice.totalPrice -= price * quantity;
          state.cartSlice.cart = state.cartSlice.cart.filter(
            (p) => p.id !== id
          );

          localStorage.setItem("cart", JSON.stringify(state.cartSlice));
        },
        undefined,
        "removeProductFromCart"
      ),

    increaseProductQuantity: (id) =>
      set(
        (state) => {
          const product = state.cartSlice.cart.find((p) => p.id === id);
          if (!product) return;

          product.quantity++;
          state.cartSlice.totalProducts++;
          product.totalPrice += product.price;
          state.cartSlice.totalPrice += product.price;

          localStorage.setItem("cart", JSON.stringify(state.cartSlice));
        },
        undefined,
        "increaseProductQuantityInCart"
      ),

    decreaseProductQuantity: (id) =>
      set(
        (state) => {
          const product = state.cartSlice.cart.find((p) => p.id === id);
          if (!product || product.quantity <= 1) return;

          product.quantity--;
          state.cartSlice.totalProducts--;
          product.totalPrice -= product.price;
          state.cartSlice.totalPrice -= product.price;

          localStorage.setItem("cart", JSON.stringify(state.cartSlice));
        },
        undefined,
        "decreaseProductQuantityInCart"
      ),

    emptyCart: () =>
      set(
        (state) => {
          state.cartSlice = initialState;
          localStorage.removeItem("cart");
        },
        undefined,
        "emptyCart"
      ),
  };
};

export default createCartSlice;

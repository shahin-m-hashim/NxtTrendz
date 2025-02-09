import useStore from "store/_store";

export const confirmPayment = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  //   throw new Error("Payment failed !!!");

  const products = useStore.getState().cartSlice.cart;

  console.log(
    products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }))
  );

  const paymentBill = {
    userId: crypto.randomUUID().slice(0, 8),
    orderId: crypto.randomUUID().slice(0, 8),
    paymentMethod: useStore.getState().cartSlice.paymentMethod,
    amount: useStore.getState().cartSlice.totalPrice,
    currency: "INR", // Currency code
    transactionId: `TXN_${crypto.randomUUID().slice(0, 8)}`,
    purchasedAt: new Date().toISOString(),
    billingAddress: {
      fullName: "John Doe",
      street: "Kariyam",
      city: "Kollam",
      state: "Kerala",
      zipCode: "10001",
      country: "INDIA",
    },
  };

  return paymentBill;
};

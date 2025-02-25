import delay from "utils/delay";
import useStore from "store/_store";
import resetAll from "utils/resetAll";

export const confirmPayment = async () => {
  try {
    await delay();

    // throw new Error("Payment failed !!!");

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
  } catch (e) {
    if (e.response?.status === 401) resetAll();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

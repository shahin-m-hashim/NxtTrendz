import { cn } from "utils/cn";
import { useContext } from "react";
import useStore from "store/_store";
import { useShallow } from "zustand/shallow";
import { confirmPayment } from "api/paymentApi";
import PaymentBill from "components/PaymentBill";
import { useMutation } from "@tanstack/react-query";
import GlobalContext from "providers/GlobalProvider";
import { RotatingLines } from "react-loader-spinner";
import PaymentOptions from "components/PaymentOptions";

export default function CheckoutModal() {
  const { checkoutModalRef, setShowCheckoutModal } = useContext(GlobalContext);

  const [
    emptyCart,
    totalPrice,
    paymentMethod,
    totalProducts,
    setPaymentMethod,
  ] = useStore(
    useShallow((store) => [
      store.emptyCart,
      store.cartSlice.totalPrice,
      store.cartSlice.paymentMethod,
      store.cartSlice.totalProducts,
      store.setPaymentMethod,
    ])
  );

  const mutation = useMutation({
    mutationFn: confirmPayment,
    onSuccess: emptyCart,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleClose = () => {
    setPaymentMethod(null);
    setShowCheckoutModal(false);
  };

  const isSubmitDisabled = !paymentMethod || mutation.isPending;

  return (
    <div
      ref={checkoutModalRef}
      className="hidden absolute backdrop-brightness-75 inset-0 z-[100]"
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="relative min-w-[300px] px-6 py-4 bg-white rounded-md shadow-md">
          {mutation.isSuccess ? (
            <PaymentBill
              handleClose={handleClose}
              paymentBill={mutation.data}
              disabled={mutation.isPending}
            />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold md:text-3xl">Order Summary</h1>

              <label className="text-xl font-medium" htmlFor="payment-method">
                Payment Method
              </label>

              <PaymentOptions />

              <h2 className="text-xl font-medium">Order Details</h2>

              <span>
                Quantity: <b>{totalProducts}</b>
              </span>

              <span>
                Total Price: <b>Rs {totalPrice}/-</b>
              </span>

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={cn(
                  "p-1 text-sm md:text-base md:p-2 flex justify-center font-semibold border rounded-md",
                  paymentMethod
                    ? "bg-green-500"
                    : "border-[#0967d2] text-[#0967d2]"
                )}
              >
                {mutation.isPending ? (
                  <RotatingLines
                    width="20"
                    height="20"
                    strokeColor="black"
                    animationDuration="0.75"
                  />
                ) : (
                  "Confirm Order"
                )}
              </button>

              {mutation.isError && (
                <div className="text-center text-red-500">
                  <p>{mutation.error?.message || "Something went wrong !!!"}</p>
                  <p>Please try again later.</p>
                </div>
              )}
            </form>
          )}

          <button
            type="button"
            disabled={mutation.isPending}
            onClick={handleClose}
            className={cn(
              "absolute top-2 right-2",
              mutation.isPending && "cursor-not-allowed"
            )}
          >
            <img src="icons/x-icon.svg" className="size-6" alt="close" />
          </button>
        </div>
      </div>
    </div>
  );
}

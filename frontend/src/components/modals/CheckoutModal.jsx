import { useContext } from "react";
import useStore from "store/_store";
import GlobalContext from "providers/GlobalProvider";

export default function CheckoutModal() {
  const { checkoutModalRef, setShowCheckoutModal } = useContext(GlobalContext);
  const { totalProducts, totalPrice } = useStore((store) => store.cartSlice);

  return (
    <div
      ref={checkoutModalRef}
      className="hidden absolute backdrop-blur-sm inset-0 z-[100]"
    >
      <div className="flex items-center justify-center px-6 size-full">
        <div className="relative text-lg flex flex-col w-full xs:max-w-xs items-center gap-4 bg-[#cdcccc] p-2 rounded-md">
          <h1 className="text-2xl font-bold">Order Summary</h1>
          <p>Total Items: {totalProducts}</p>
          <p>
            <span>Total Amount:</span>{" "}
            <span className="font-semibold">Rs {totalPrice}/-</span>
          </p>

          <button
            type="button"
            className=" bg-[#0967d2] text-white px-4 py-2 w-full"
          >
            Checkout
          </button>

          <button
            type="button"
            className="absolute top-2 right-2"
            onClick={() => setShowCheckoutModal(false)}
          >
            <img src="icons/x-icon.svg" className="size-6" alt="close" />
          </button>
        </div>
      </div>
    </div>
  );
}

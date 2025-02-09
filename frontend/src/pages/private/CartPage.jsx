import { useContext } from "react";
import useStore from "store/_store";
import CartItem from "components/cart/CartItem";
import GlobalContext from "providers/GlobalProvider";
import EmptyCart from "components/cart/EmptyCartView";
import EmptyCartBtn from "components/cart/EmptyCartBtn";
import CheckoutModal from "components/modals/CheckoutModal";

export default function CartPage() {
  const cart = useStore((store) => store.cartSlice.cart);
  const { setShowCheckoutModal } = useContext(GlobalContext);
  const totalPrice = useStore((store) => store.cartSlice.totalPrice);

  console.log("Rendering Cart Page");

  return (
    <main className="relative flex flex-col h-screen overflow-auto">
      <div className="flex flex-col flex-1 gap-6 px-6 pt-20 pb-6 md:px-28 lg:px-48">
        {cart.length > 0 ? (
          <>
            <h1 className="text-4xl font-bold">Your Cart</h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-between gap-6 xs:flex-row">
                <h2 className="text-xl underline decoration-indigo-500 underline-offset-4">
                  Grand Total:{" "}
                  <span className="font-semibold">Rs {totalPrice}/-</span>
                </h2>

                <div className="flex flex-col items-center justify-end gap-4 xs:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(true)}
                    className="xs:w-fit w-full font-semibold border border-[#0967d2] text-[#0967d2] rounded-md px-2 py-1"
                  >
                    Proceed to Checkout
                  </button>

                  <EmptyCartBtn />
                </div>
              </div>

              <ul className="flex flex-col gap-4">
                {cart.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>

      <CheckoutModal />
    </main>
  );
}

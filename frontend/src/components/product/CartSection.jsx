import useStore from "store/_store";
import { useShallow } from "zustand/shallow";
import GoToCart from "components/product/GoToCart";
import AddToCartBtn from "components/product/AddToCart";
import QuantityController from "components/QuantityController";

export default function CartSection() {
  const [
    isInCart,
    quantityInCart,
    quantityToAddInCart,
    decreaseQuantity,
    increaseQuantity,
  ] = useStore(
    useShallow((store) => [
      store.productSlice.isInCart,
      store.productSlice.quantityInCart,
      store.productSlice.quantityToAddInCart,
      store.decreaseProductQuantityToAddInCart,
      store.increaseProductQuantityToAddInCart,
    ])
  );

  console.log("Rendering Cart Section");

  return (
    <div className="flex items-center justify-between">
      {isInCart ? (
        <>
          <span>
            Already in cart{" "}
            <span className="text-[#0967d2] font-semibold">
              ({quantityInCart})
            </span>
          </span>
          <GoToCart />
        </>
      ) : (
        <>
          <QuantityController
            quantity={quantityToAddInCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />

          <AddToCartBtn />
        </>
      )}
    </div>
  );
}

import { cn } from "utils/cn";
import useStore from "store/_store";

export default function AddToCart() {
  const quantityToAddInCart = useStore(
    (store) => store.productSlice.quantityToAddInCart
  );
  const addToCart = useStore((store) => store.addProductToCart);

  return (
    <button
      type="button"
      onClick={addToCart}
      disabled={quantityToAddInCart <= 0}
      className={cn(
        "bg-[#0967d2] text-base text-white px-4 py-2 rounded-md",
        quantityToAddInCart <= 0 && "opacity-60"
      )}
    >
      Add to Cart
    </button>
  );
}

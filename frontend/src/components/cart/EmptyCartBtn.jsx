import useStore from "store/_store";

export default function EmptyCartBtn() {
  const emptyCart = useStore((store) => store.emptyCart);

  return (
    <button
      type="button"
      onClick={emptyCart}
      className="w-full px-3 py-1 bg-red-500 rounded-md xs:w-fit"
    >
      Empty Cart
    </button>
  );
}

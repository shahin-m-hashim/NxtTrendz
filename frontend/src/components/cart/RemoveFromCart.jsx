import useStore from "store/_store";

export default function RemoveFromCart({ id }) {
  const removeFromCart = useStore((store) => store.removeProductFromCart);

  return (
    <button onClick={() => removeFromCart(id)} type="button">
      <img alt="close" className="size-6" src="icons/cross-circle.svg" />
    </button>
  );
}

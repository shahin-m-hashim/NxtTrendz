export default function QuantityController({
  quantity = 0,
  increaseQuantity = () => {},
  decreaseQuantity = () => {},
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={decreaseQuantity}
        className="font-semibold border border-[#0967d2] text-[#0967d2] rounded-sm p-1"
      >
        <img src="icons/minus.svg" className="size-4" alt="decrease" />
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={increaseQuantity}
        className="font-semibold border border-[#0967d2] text-[#0967d2] rounded-sm p-1"
      >
        <img src="icons/plus.svg" className="size-4" alt="increase" />
      </button>
    </div>
  );
}

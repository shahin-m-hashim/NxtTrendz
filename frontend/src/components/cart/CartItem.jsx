import useStore from "store/_store";
import RemoveFromCart from "components/cart/RemoveFromCart";
import QuantityController from "components/QuantityController";

export default function CartItem({ product }) {
  const increaseQuantity = useStore((store) => store.increaseProductQuantity);
  const decreaseQuantity = useStore((store) => store.decreaseProductQuantity);

  return (
    <li
      key={product.id}
      className="flex items-center justify-between p-2 xs:p-5 rounded-md shadow-lg border border-[#e9e9e9]"
    >
      <div className="flex items-center gap-4">
        <img
          alt={product.id}
          src={product.image_url}
          className="rounded-md size-20 xs:size-32"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">{product.title}</h1>
            <p>by {product.brand}</p>
          </div>

          <div className="md:hidden">
            <QuantityController
              quantity={product.quantity}
              increaseQuantity={() => increaseQuantity(product.id)}
              decreaseQuantity={() => decreaseQuantity(product.id)}
            />
          </div>

          <div className="xs:hidden">
            <span className="text-[#0967d2] font-semibold">
              Rs {product.totalPrice}/-
            </span>
          </div>
        </div>
      </div>

      <div className="flex-col hidden gap-2 md:inline-flex">
        {product.quantity === product.remaining ? (
          <span className="font-semibold text-red-500">Max reached</span>
        ) : (
          <></>
        )}

        <QuantityController
          quantity={product.quantity}
          increaseQuantity={() => increaseQuantity(product.id)}
          decreaseQuantity={() => decreaseQuantity(product.id)}
        />
      </div>

      <div className="hidden xs:inline">
        <span className="text-[#0967d2] font-semibold">
          Rs {product.totalPrice}/-
        </span>
      </div>

      <RemoveFromCart id={product.id} />
    </li>
  );
}

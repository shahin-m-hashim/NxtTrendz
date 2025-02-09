import { Link } from "react-router";
import useStore from "store/_store";

export default function CartLink() {
  const cartQuantity = useStore((store) => store.cartSlice.totalProducts);

  return (
    <li className="relative mr-4 size-6">
      <Link to="cart">
        <img
          alt="cart"
          className="xs:hidden size-6"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
        />
        <span className="hidden xs:inline">Cart</span>
        {cartQuantity > 0 && (
          <div className="absolute bottom-3 left-4 xs:bottom-2.5 xs:left-6 bg-[#d23b09] text-xs text-white px-[6px] py-[2px] xs:px-2 xs:py-1 rounded-full">
            {cartQuantity}
          </div>
        )}
      </Link>
    </li>
  );
}

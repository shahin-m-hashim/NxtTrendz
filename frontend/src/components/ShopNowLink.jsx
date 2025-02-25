import cn from "utils/cn";
import { Link } from "react-router";

export default function ShopNowLink({ className = "" }) {
  return (
    <Link to="/products">
      <button
        type="button"
        className={cn(
          "font-semibold border text-white bg-[#0967d2] rounded-md px-4 py-2",
          className
        )}
      >
        Shop Now
      </button>
    </Link>
  );
}

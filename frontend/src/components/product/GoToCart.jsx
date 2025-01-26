import { Link } from "react-router";

export default function GoToCart() {
  return (
    <Link to="/cart">
      <button
        type="button"
        className="px-4 py-2 text-base text-white bg-green-500 rounded-md"
      >
        Go to Cart
      </button>
    </Link>
  );
}

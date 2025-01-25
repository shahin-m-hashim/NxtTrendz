import { Link } from "react-router";

export default function ProductError() {
  console.log("Rendering Product Error");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-6 text-center ">
      <img
        alt="product error"
        className="h-[40vh]"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      />

      <h1 className="text-2xl font-bold">Product Not Found</h1>

      <p className="text-[#475569] text-lg">
        The product you requested might have been removed, banned or is
        temporarily unavailable.
      </p>

      <Link
        to="/products"
        className="font-semibold border text-white bg-[#0967d2] rounded-md px-4 py-2"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

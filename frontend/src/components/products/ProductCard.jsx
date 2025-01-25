import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="h-fit rounded-b-md bg-[#e9e9e9]"
    >
      <img
        alt={product.title}
        src={product.image_url}
        className="rounded-t-md"
      />

      <div className="flex flex-col gap-2 p-2">
        <h1 className="font-bold">{product.title}</h1>
        <p>By {product.brand}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            <span>Rs </span>
            {product.price}
            <span>/-</span>
          </span>

          <div className="flex items-center gap-1 rounded-md px-2 bg-[#0967d2] text-white">
            <span>{product.rating}</span>
            <img src="icons/star.svg" className="size-4" alt="star" />
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useEffect } from "react";
import useStore from "store/_store";
import { useParams } from "react-router";
import { getProduct } from "api/productsApi";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import CartSection from "components/product/CartSection";
import ProductCard from "components/products/ProductCard";
import ProductError from "components/product/ProductError";

export default function ProductPage() {
  const { id } = useParams();

  const setProduct = useStore((state) => state.setProduct);

  const { data, isFetching, isError, isFetched } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
  });

  useEffect(() => {
    if (isFetched) setProduct(data.product);
  }, [data]);

  if (isFetching) {
    return (
      <ThreeDots
        color="#0967d2"
        ariaLabel="loading-product"
        wrapperClass="h-screen w-full flex items-center justify-center"
      />
    );
  }

  if (isError) return <ProductError />;

  // console.log("Rendering Product Page");

  return (
    <main className="flex flex-col h-screen overflow-auto">
      <div className="flex flex-col items-center flex-1 gap-6 px-6 pt-20 pb-6 md:px-28 lg:px-48">
        <div className="flex items-center justify-center ">
          <div className="grid gap-6 md:grid-cols-2">
            <img
              alt={data.product.title}
              src={data.product.image_url}
              className="object-cover object-center rounded-lg size-full"
            />

            <div className="flex flex-col flex-1 flex-shrink-0 gap-6 text-lg">
              <h1 className="text-3xl lg:text-5xl font-bold text-[#475569]">
                {data.product.title}
              </h1>

              <span className="text-xl lg:text-2xl text-[#12022f] font-semibold">
                Rs {data.product.price}/-
              </span>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-base rounded-md px-3 py-1 bg-[#0967d2] text-white">
                  <span>{data.product.rating}</span>
                  <img src="icons/star.svg" className="size-4" alt="star" />
                </div>

                <span>{data.product.total_reviews} Reviews</span>
              </div>

              <p className="text-xl md:text-justify">
                {data.product.description}
              </p>

              <div className="flex justify-between">
                <span>
                  <span className="font-semibold">Availability: </span>
                  <span>
                    {data.product.in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </span>

                <span>
                  <span className="font-semibold">Brand: </span>
                  <span>{data.product.brand}</span>
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>
                  <span className="font-semibold">Sold Out: </span>
                  <span>{data.product.sold}</span>
                </span>

                <span>
                  <span className="font-semibold">Still Remaining: </span>
                  <span>{data.product.remaining}</span>
                </span>
              </div>

              <hr className="h-0.5 bg-[#cbced2]" />
              <CartSection />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#475569]">
            Similar Products
          </h1>

          <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3">
            {data.similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

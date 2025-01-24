import useStore from "store/_store";
import { useShallow } from "zustand/shallow";
import { getProducts } from "api/productsApi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import ProductCard from "components/products/ProductCard";
import ProductsError from "components/products/ProductsError";

export default function Products() {
  const [products, isSearchDebouncing] = useStore(
    useShallow((state) => [
      state.products.items,
      state.products.isSearchDebouncing,
    ])
  );

  const productsQuery = useQuery({
    queryFn: getProducts,
    queryKey: ["products"],
  });

  if (
    productsQuery.isLoading ||
    productsQuery.isFetching ||
    isSearchDebouncing
  ) {
    return (
      <ThreeDots
        color="#0967d2"
        ariaLabel="loading-products"
        wrapperClass="flex flex-col items-center justify-center flex-1"
      />
    );
  }

  if (productsQuery.isError) return <ProductsError />;

  console.log("Rendering Products");

  return (
    <>
      {products?.length > 0 ? (
        <ul className="grid grid-cols-1 h-[calc(60vh+1rem)] xs:h-[calc(65vh+1rem)] md:h-[calc(100vh-1rem)] gap-4 overflow-auto xs:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          <img
            className="h-[40vh]"
            alt="no products found"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          />

          <h1 className="text-2xl font-bold">No Products Found</h1>

          <p className="text-[#475569]">
            We could not find any products. Try other filters.
          </p>
        </div>
      )}
    </>
  );
}

import { useEffect } from "react";
import { useContext } from "react";
import useStore from "store/_store";
import { getProducts } from "api/productsApi";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import GlobalContext from "providers/GlobalProvider";
import ProductCard from "components/products/ProductCard";
import ProductsError from "components/products/ProductsError";

export default function Products() {
  const [searchParams] = useSearchParams();
  const setProducts = useStore((store) => store.setProducts);
  const { searchProductInputRef } = useContext(GlobalContext);

  const rating = searchParams.get("rating") || 0;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort_by") || "";
  const category = searchParams.get("category") || "";

  const {
    isError,
    isFetched,
    isFetching,
    data: products,
  } = useQuery({
    queryKey: ["products", rating, search, sortBy, category],
    queryFn: () => getProducts(rating, search, sortBy, category),
  });

  useEffect(() => {
    if (isFetched) {
      setProducts(products);
      searchProductInputRef.current.value = search;
    }
  }, [products]);

  if (isFetching) {
    return (
      <ThreeDots
        color="#0967d2"
        ariaLabel="loading-products"
        wrapperClass="h-3/4 flex flex-col items-center justify-center flex-1"
      />
    );
  }

  if (isError) return <ProductsError />;

  console.log("Rendering Products");

  return (
    <>
      {products?.length > 0 ? (
        <ul className="grid h-full grid-cols-1 gap-4 overflow-auto xs:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
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

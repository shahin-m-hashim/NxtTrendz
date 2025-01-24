import Products from "components/Products";
import SortProducts from "components/products/SortProducts";
import ProductsRating from "components/products/ProductsRating";
import SearchProducts from "components/products/SearchProducts";
import ClearFiltersBtn from "components/products/ClearFiltersBtn";
import ProductsCategory from "components/products/ProductsCategory";

export default function ProductsPage() {
  console.log("Rendering Products Page");

  return (
    <main className="flex flex-col h-screen overflow-auto">
      <div className="flex items-center flex-1 w-full px-6 pt-20 pb-6 md:px-28 lg:px-48">
        <div className="flex flex-col w-full gap-6">
          <img
            alt="exclusive deals banner"
            className="h-[50vh] hidden md:block"
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          />

          <div className="flex flex-col w-full gap-6 md:gap-0 md:flex-row">
            <div className="flex flex-col gap-6 md:w-[15vw]">
              <div className="flex gap-4">
                <SearchProducts />
                <div className="md:hidden">
                  <ClearFiltersBtn />
                </div>
              </div>

              <div className="flex justify-between gap-4 md:flex-col">
                <ProductsCategory />
                <ProductsRating />
              </div>

              <div className="hidden md:inline">
                <ClearFiltersBtn />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:px-4 md:flex-1">
              <SortProducts />
              <Products />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

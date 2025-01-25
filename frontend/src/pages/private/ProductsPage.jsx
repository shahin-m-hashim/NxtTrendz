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
      <div className="flex flex-col items-center flex-1 w-full gap-4 px-6 pt-20 pb-6 md:px-28 lg:px-48">
        <div className="hidden md:block">
          <img
            alt="exclusive deals banner"
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          />
        </div>

        <div className="flex items-center justify-between w-full gap-6">
          <div className="flex w-full h-10 md:w-[calc(30%-1.5rem)] gap-4">
            <SearchProducts />
            <div className="md:hidden">
              <ClearFiltersBtn />
            </div>
          </div>

          {window.innerWidth >= 768 && <SortProducts />}
        </div>

        <div className="flex flex-col w-full h-[calc(100vh+1.5rem)] gap-6 md:gap-0 md:flex-row">
          <div className="flex md:flex-col flex-shrink-0 md:w-[30%] gap-6">
            <ProductsCategory />
            <ProductsRating />
            <div className="hidden md:block">
              <ClearFiltersBtn />
            </div>
          </div>

          {window.innerWidth < 768 && <SortProducts />}

          <Products />
        </div>
      </div>
    </main>
  );
}

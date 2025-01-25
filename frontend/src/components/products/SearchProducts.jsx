import { useContext } from "react";
import useStore from "store/_store";
import { useSearchParams } from "react-router";
import GlobalContext from "providers/GlobalProvider";
import { getAllQueryParams } from "utils/queryParams";

export default function SearchProducts() {
  const [, setSearchParams] = useSearchParams();

  const { searchProductInputRef, productSearchDebounceTimerRef } =
    useContext(GlobalContext);

  const setIsSearchingProduct = useStore(
    (state) => state.setIsSearchingProduct
  );

  const handleChange = () => {
    const newSearchValue = searchProductInputRef.current.value;
    const existingQueryParams = getAllQueryParams();

    clearTimeout(productSearchDebounceTimerRef.current);

    if (!newSearchValue) {
      // eslint-disable-next-line no-unused-vars
      const { search, ...rest } = existingQueryParams;
      setSearchParams(rest);
      return;
    }

    setIsSearchingProduct(true);

    productSearchDebounceTimerRef.current = setTimeout(() => {
      setSearchParams({ ...existingQueryParams, search: newSearchValue });
    }, 500);
  };

  return (
    <div className="flex items-center w-full overflow-hidden border border-gray-300 rounded-md">
      <input
        type="search"
        autoComplete="off"
        id="search-products"
        placeholder="Search"
        name="search-products"
        onChange={handleChange}
        ref={searchProductInputRef}
        className="w-full p-2 outline-none"
      />

      <div className="flex items-center justify-center w-10 h-full p-2 bg-gray-400">
        <img alt="search icon" className="size-full" src="icons/search.svg" />
      </div>
    </div>
  );
}

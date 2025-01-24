import { useRef } from "react";
import { useEffect } from "react";
import useStore from "store/_store";
import { useShallow } from "zustand/shallow";
import { useSearchParams } from "react-router";
import { getQueryParams } from "utils/queryParams";
import { useQueryClient } from "@tanstack/react-query";

export default function SearchProducts() {
  const debounceTimer = useRef();
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  const [searchKeyword, setProductsSearchKeyword] = useStore(
    useShallow((s) => [s.products.searchKeyword, s.setProductsSearchKeyword])
  );

  const handleChange = (e) => {
    const newSearchValue = e.target.value;
    setProductsSearchKeyword(newSearchValue);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const existingQueryParams = getQueryParams();
      if (newSearchValue) {
        setSearchParams({ ...existingQueryParams, search: newSearchValue });
      } else {
        // eslint-disable-next-line no-unused-vars
        const { search, ...rest } = existingQueryParams;
        setSearchParams(rest);
      }
      queryClient.invalidateQueries(["products"]);
    }, 600);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  return (
    <div className="flex items-center w-full h-10 overflow-hidden border border-gray-300 rounded-md">
      <input
        type="search"
        id="search-products"
        placeholder="Search"
        value={searchKeyword}
        name="search-products"
        onChange={handleChange}
        className="w-full p-2 outline-none"
      />

      <div className="flex items-center justify-center w-10 h-full p-2 bg-gray-400">
        <img alt="search icon" className="size-full" src="icons/search.svg" />
      </div>
    </div>
  );
}

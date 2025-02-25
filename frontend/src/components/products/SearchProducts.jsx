import { useContext } from "react";
import { useSearchParams } from "react-router";

import { setQueryParam } from "utils/queryParams";
import GlobalContext from "providers/GlobalProvider";

export default function SearchProducts() {
  const [, setSearchParams] = useSearchParams();

  const { searchProductInputRef } = useContext(GlobalContext);

  const handleSearch = (searchQuery) => {
    const updatedQueryParams = setQueryParam("search", searchQuery);
    setSearchParams(updatedQueryParams);
  };

  const handleChange = () => {
    const searchQuery = searchProductInputRef.current.value;
    if (!searchQuery) handleSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = searchProductInputRef.current.value;
    handleSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full overflow-hidden border border-gray-300 rounded-md"
    >
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

      <button
        type="submit"
        className="flex items-center justify-center w-10 h-full p-2 bg-gray-400"
      >
        <img alt="search icon" className="size-full" src="icons/search.svg" />
      </button>
    </form>
  );
}

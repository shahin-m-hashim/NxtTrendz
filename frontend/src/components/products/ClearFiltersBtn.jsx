import { useSearchParams } from "react-router";
import { deleteQueryParams } from "utils/queryParams";
import { useQueryClient } from "@tanstack/react-query";

export default function ClearFiltersBtn() {
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  const clearFilters = () => {
    const updatedParams = deleteQueryParams(["category", "rating"]);
    setSearchParams(updatedParams);
    queryClient.invalidateQueries(["products"]);
  };

  return (
    <button
      type="button"
      onClick={clearFilters}
      className="font-semibold border border-[#0967d2] text-[#0967d2] rounded-md py-1 px-2 lg:px-4 lg:py-2 w-fit text-xs"
    >
      CLEAR FILTERS
    </button>
  );
}

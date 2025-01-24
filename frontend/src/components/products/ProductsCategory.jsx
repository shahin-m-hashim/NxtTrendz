import { cn } from "utils/cn";
import { useSearchParams } from "react-router";
import { getQueryParams } from "utils/queryParams";
import { useQueryClient } from "@tanstack/react-query";

const categories = ["clothing", "electronics", "appliances", "grocery", "toys"];

export default function ProductsCategory() {
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();
  const activeCategory = getQueryParams().category || "";

  const handleClick = (category) => {
    const existingQueryParams = getQueryParams();
    setSearchParams({ ...existingQueryParams, category });
    queryClient.invalidateQueries(["products"]);
  };

  return (
    <div className="flex flex-col items-start gap-2 xs:flex-1 md:flex-initial">
      <h1 className="text-lg font-bold underline underline-offset-4">
        Category
      </h1>

      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={cn(
            activeCategory === category
              ? "text-[#0967d2] font-semibold"
              : "text-[#64748b]"
          )}
          onClick={() => handleClick(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}

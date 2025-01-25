import { useSearchParams } from "react-router";
import { getAllQueryParams, getQueryParam } from "utils/queryParams";

const sortbyOptions = [
  {
    optionId: "",
    displayText: "Default (None)",
  },
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
  {
    optionId: "RATING_HIGH",
    displayText: "Rating (High-Low)",
  },
  {
    optionId: "RATING_LOW",
    displayText: "Rating (Low-High)",
  },
];

export default function SortProducts() {
  const [, setSearchParams] = useSearchParams();
  const activeSort = getQueryParam("sort_by") || "";

  const handleChange = (e) => {
    const existingQueryParams = getAllQueryParams();
    if (e.target.value) {
      setSearchParams({ ...existingQueryParams, sort_by: e.target.value });
    } else {
      // eslint-disable-next-line no-unused-vars
      const { sort_by, ...rest } = existingQueryParams;
      setSearchParams(rest);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-1 xs:flex-row">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="flex justify-between flex-1 gap-4 xs:flex-initial">
        <div className="flex items-center gap-2">
          <img src="icons/sort.svg" alt="sort" className="size-6" />
          <label htmlFor="sort">Sort By</label>
        </div>

        <select
          id="sort"
          name="sort"
          value={activeSort}
          onChange={handleChange}
          className="h-8 px-2 border border-gray-400 rounded-md"
        >
          {sortbyOptions.map((option) => (
            <option value={option.optionId} key={option.optionId}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

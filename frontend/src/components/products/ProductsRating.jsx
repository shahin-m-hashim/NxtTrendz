import cn from "utils/cn";
import { useSearchParams } from "react-router";
import { getAllQueryParams, getQueryParam } from "utils/queryParams";

const ratingsList = [
  {
    ratingId: 4,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: 3,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: 2,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: 1,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

export default function ProductsRating() {
  const [, setSearchParams] = useSearchParams();
  const activeRating = getQueryParam("rating") || 0;

  const handleClick = (rating) => {
    const existingQueryParams = getAllQueryParams();
    setSearchParams({ ...existingQueryParams, rating });
  };

  return (
    <div className="flex flex-col flex-1 gap-4 md:flex-initial">
      <h1 className="text-lg font-bold underline underline-offset-4">Rating</h1>

      {ratingsList.map((rating) => (
        <button
          type="button"
          key={rating.ratingId}
          className="flex items-center"
          onClick={() => handleClick(rating.ratingId)}
        >
          <img
            alt={rating.ratingId}
            src={rating.imageUrl}
            className={cn(
              activeRating == rating.ratingId
                ? "w-4/5 md:w-3/4"
                : "w-3/4 md:w-2/3"
            )}
          />
          <span
            className={cn(
              "text-sm md:text-xs lg:text-base",
              activeRating == rating.ratingId
                ? "text-[#0967d2] font-semibold"
                : "text-[#64748b]"
            )}
          >
            & up
          </span>
        </button>
      ))}
    </div>
  );
}

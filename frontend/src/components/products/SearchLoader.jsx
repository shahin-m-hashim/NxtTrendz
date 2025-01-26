import useStore from "store/_store";
import { MagnifyingGlass } from "react-loader-spinner";

export default function SearchLoader() {
  const isSearching = useStore((store) => store.products.isSearching);

  if (!isSearching) return <></>;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur h-3/4">
      <MagnifyingGlass ariaLabel="searching-products" />
    </div>
  );
}

import useStore from "store/_store";
import { ThreeDots } from "react-loader-spinner";

export default function SearchLoader() {
  const isSearching = useStore((store) => store.products.isSearching);

  if (!isSearching) return <></>;

  return (
    <ThreeDots
      color="#0967d2"
      ariaLabel="loading-products"
      wrapperClass="backdrop-blur h-3/4 absolute inset-0 flex flex-col items-center justify-center"
    />
  );
}

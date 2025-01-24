export default function ProductsError() {
  console.log("Rendering Products Error");

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
      <img
        className="h-[40vh] pr-10"
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />

      <h1 className="text-2xl font-bold">Oops! Something Went Wrong</h1>

      <p className="text-[#475569] w-1/2">
        We are having some trouble processing your request !!! Please try again
        after some time.
      </p>
    </div>
  );
}

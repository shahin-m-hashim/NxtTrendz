export default function ProductError() {
  console.log("Rendering Product Error");

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
      <img
        alt="product error"
        className="h-[40vh] pr-10"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      />

      <h1 className="text-2xl font-bold">Oops! Something Went Wrong</h1>

      <p className="text-[#475569] w-1/2">
        We are having some trouble processing your request !!! Please try again
        after some time.
      </p>
    </div>
  );
}

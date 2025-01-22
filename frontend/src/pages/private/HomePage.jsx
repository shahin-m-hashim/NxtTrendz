export default function HomePage() {
  console.log("Rendering Home Page");

  return (
    <main className="flex flex-col items-center justify-center md:flex-row md:gap-14">
      <div className="flex flex-col gap-6 md:flex-1">
        <h1 className="text-3xl font-bold leading-10 text-black xl:text-5xl">
          Clothes That Get YOU Noticed
        </h1>

        <img
          alt="home"
          className="md:hidden size-full"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        />

        <p className="text-[#475569] text-lg text-justify">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>

        <button className="w-1/2 px-4 py-2 bg-[#0967d2] text-white rounded-md">
          Shop Now
        </button>
      </div>

      <div className="flex-1 hidden md:flex">
        <img
          alt="home"
          className="size-full"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        />
      </div>
    </main>
  );
}

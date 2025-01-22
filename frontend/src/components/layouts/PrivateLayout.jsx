import Navbar from "components/Navbar";
import { Outlet } from "react-router";

export default function PrivateLayout() {
  console.log("Rendering Private Layout");

  return (
    <section className="h-screen overflow-auto flex flex-col min-w-[320px]">
      <Navbar />

      <div className="flex items-center flex-1 w-full px-6 pt-20 pb-10 md:pt-14 md:pb-0 md:px-28 lg:px-48">
        <Outlet />
      </div>
    </section>
  );
}

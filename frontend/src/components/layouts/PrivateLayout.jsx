import useStore from "store/_store";
import Navbar from "components/Navbar";
import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

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

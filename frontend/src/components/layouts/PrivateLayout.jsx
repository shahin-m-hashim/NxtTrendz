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
    <section className="min-w-[320px]">
      <Navbar />

      <Outlet />
    </section>
  );
}

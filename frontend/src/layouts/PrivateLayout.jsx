import Navbar from "components/Navbar";
import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  if (!localStorage.getItem("isAuthenticated")) {
    return <Navigate to="auth/login" replace />;
  }

  return (
    <section className="min-w-[320px]">
      <Navbar />

      <Outlet />
    </section>
  );
}

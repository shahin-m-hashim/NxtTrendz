import { useLocation, Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  console.log("Rendering Public Layout");

  const { pathname } = useLocation();

  if (pathname === "/") return <Navigate to="/login" replace={true} />;

  return (
    <section className="h-screen overflow-auto min-w-[320px] flex flex-col">
      <main className="flex flex-col items-center justify-center flex-1 w-full p-5 md:p-0 md:flex-row">
        <div className="flex flex-col items-center justify-around flex-1 gap-5 md:items-end">
          <img
            alt="website logo"
            className="w-1/2 md:hidden"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          />

          <img
            alt="website login"
            className="md:w-[80%]"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 w-full gap-3 md:items-center">
          <Outlet />
        </div>
      </main>
    </section>
  );
}

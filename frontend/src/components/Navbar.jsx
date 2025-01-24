import { Link } from "react-router";
import { logoutUser } from "api/authApi";
import { useMutation } from "@tanstack/react-query";

export default function Navbar() {
  console.log("Rendering Navbar");

  const mutation = useMutation({
    mutationFn: logoutUser,
  });

  return (
    <nav className="fixed w-full bg-[#FFFAF0] border-b-2 border-b-[#e2e8f0] h-14">
      <div className="flex items-center justify-between px-6 size-full md:px-28 lg:px-48">
        <Link to="/">
          <img
            alt="website logo"
            className="w-24 xs:w-28 lg:w-40"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          />
        </Link>

        <ul className="flex items-center xs:w-auto gap-4 text-[#64748b]">
          <li>
            <Link to="/">
              <img
                alt="home"
                className="xs:hidden size-6"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
              />
              <span className="hidden xs:inline">Home</span>
            </Link>
          </li>

          <li>
            <Link to="products">
              <img
                alt="products"
                className="xs:hidden size-6"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
              />
              <span className="hidden xs:inline">Products</span>
            </Link>
          </li>

          <li>
            <Link to="cart">
              <img
                alt="cart"
                className="xs:hidden size-6"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
              />
              <span className="hidden xs:inline">Cart</span>
            </Link>
          </li>

          <li className="xs:bg-[#0967d2] xs:py-1 xs:px-3 rounded-md">
            <button
              type="button"
              onClick={() => mutation.mutate()}
              className="text-sm text-white"
            >
              <img
                alt="home"
                className="pt-1.5 xs:hidden size-6"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

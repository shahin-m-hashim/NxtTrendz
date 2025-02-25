import { Link } from "react-router";

import LogoutBtn from "components/LogoutBtn";
import CartLink from "components/cart/CartLink";

export default function Navbar() {
  // console.log("Rendering Navbar");

  return (
    <nav className="fixed z-50 w-full bg-[#FFFAF0] border-b-2 border-b-[#e2e8f0] h-14">
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

          <CartLink />

          <li className="xs:bg-[#0967d2] xs:py-1 xs:px-3 rounded-md">
            <LogoutBtn />
          </li>
        </ul>
      </div>
    </nav>
  );
}

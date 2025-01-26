import ShopNowLink from "components/ShopNowLink";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <img
        alt="cart empty"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      />
      <h1 className="text-2xl font-bold">Your Cart Is Empty</h1>

      <ShopNowLink />
    </div>
  );
}

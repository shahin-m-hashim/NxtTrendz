import useStore from "store/_store";

const paymentOptionsList = [
  {
    id: "CARD",
    displayText: "Card",
    isDisabled: true,
  },
  {
    id: "NET BANKING",
    displayText: "Net Banking",
    isDisabled: true,
  },
  {
    id: "UPI",
    displayText: "UPI",
    isDisabled: false,
  },
  {
    id: "WALLET",
    displayText: "Wallet",
    isDisabled: true,
  },
  {
    id: "CASH ON DELIVERY",
    displayText: "Cash on Delivery",
    isDisabled: false,
  },
];

export default function PaymentOptions() {
  const setPaymentMethod = useStore((store) => store.setPaymentMethod);

  return (
    <ul className="flex flex-col gap-4 text-sm md:flex-row md:text-base">
      {paymentOptionsList.map((paymentOption) => (
        <li
          key={paymentOption.id}
          className="flex items-center gap-2 font-medium"
        >
          <input
            type="radio"
            id={paymentOption.id}
            name="payment-method"
            value={paymentOption.id}
            disabled={paymentOption.isDisabled}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label
            htmlFor={paymentOption.id}
            className={paymentOption.isDisabled ? "opacity-50" : ""}
          >
            {paymentOption.displayText}
          </label>
        </li>
      ))}
    </ul>
  );
}

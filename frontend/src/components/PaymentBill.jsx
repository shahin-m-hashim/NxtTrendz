export default function PaymentBill({ paymentBill }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center rounded-full">
          <img alt="success" className="size-6" src="icons/circle-check.svg " />
        </div>
        <h1 className="mt-2 text-xl font-semibold text-gray-800">
          Payment Successful
        </h1>
        <p className="text-sm text-gray-500">Thank you for your purchase!</p>
      </div>

      {/* Order Details */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Order ID:</span>
          <span className="text-gray-500">{paymentBill.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Transaction ID:</span>
          <span className="text-gray-500">{paymentBill.transactionId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Payment Method:</span>
          <span className="text-gray-500">{paymentBill.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Amount Paid:</span>
          <span className="text-gray-500">
            ₹{paymentBill.amount} {paymentBill.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date & Time:</span>
          <span className="text-gray-500">
            {new Date(paymentBill.purchasedAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Billing Address */}
      <div className="flex flex-col gap-2 p-2 bg-gray-200 rounded-md">
        <h2 className="text-sm font-semibold text-gray-700">Billing Address</h2>
        <p className="text-sm leading-tight text-gray-500">
          {paymentBill.billingAddress.fullName},{" "}
          {paymentBill.billingAddress.street}, {paymentBill.billingAddress.city}
          , {paymentBill.billingAddress.state},{" "}
          {paymentBill.billingAddress.zipCode},{" "}
          {paymentBill.billingAddress.country}
        </p>
      </div>

      <div className="flex flex-col justify-between gap-2 xs:flex-row">
        <button
          className="px-2 py-1 text-sm font-medium transition border border-gray-300 rounded-md md:px-4 md:py-2 hover:bg-gray-100"
          onClick={() =>
            navigator.clipboard.writeText(paymentBill.transactionId)
          }
        >
          Copy Transaction ID
        </button>

        <button className="px-2 py-1 text-sm font-medium text-white transition bg-blue-600 rounded-md md:px-4 md:py-2 hover:bg-blue-700">
          Download Invoice
        </button>
      </div>
    </div>
  );
}

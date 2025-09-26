// src/pages/OrderSuccess.jsx
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center py-10">
      <h1 className="heading-1 text-emerald-600 mb-4">
        🎉 Your order has been placed successfully!
      </h1>
      <p className="text-lg mb-6 text-gray-700">
        Our agent will call you shortly for payment-related queries.
      </p>
      <Link
        to="/"
        className="btn-primary px-6 py-2"
      >
        Back to Home
      </Link>
    </div>
  );
}

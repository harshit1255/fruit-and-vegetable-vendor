// src/pages/OrderSuccess.jsx
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Your order has been placed successfully!
      </h1>
      <p className="text-lg mb-6">
        Our agent will call you shortly for payment-related queries.
      </p>
      <Link
        to="/"
        className="bg-green-500 text-white px-6 py-2 rounded shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
}

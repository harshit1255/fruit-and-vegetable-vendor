import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse()); // Show latest first
  }, []);

  if (orders.length === 0) {
    return (
      <div className="container py-10">
        <p className="text-center text-gray-500">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-6">
      <h1 className="heading-1 mb-6 text-center">Order History</h1>
      {orders.map((order, i) => (
        <div
          key={i}
          className="card p-4 mb-4"
        >
          <p className="font-semibold">
            Order Date: {new Date(order.orderDate).toLocaleString()}
          </p>
          <p className="text-gray-700">Name: {order.name}</p>
          <p className="text-gray-700">Phone: {order.phoneNumber}</p>
          <p className="text-gray-700">Address: {order.address}</p>
          <p className="font-semibold mt-2">
            Total: ₹{order.totalAmount.toFixed(2)}
          </p>
          <ul className="list-disc pl-5 mt-2">
            {order.orderedItems.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                {item.name} - {item.quantityInKg}x @ ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

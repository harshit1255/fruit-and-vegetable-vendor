import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse()); // Show latest first
  }, []);

  if (orders.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No orders yet.</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Order History</h1>
      {orders.map((order, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md"
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
                {item.name} - {item.quantityInKg}kg @ ₹{item.price}/kg
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

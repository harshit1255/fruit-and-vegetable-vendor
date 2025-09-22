import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price_per_kg * (item.quantity || 1),
    0
  );

  async function placeOrder(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!/^\d{10}$/.test(orderData.phone)) {
      setMessage("❌ Phone number must be 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const orderedItems = cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price_per_kg,
        quantityInKg: item.quantity || 1,
      }));

      const payload = {
        name: orderData.name,
        address: orderData.address,
        phoneNumber: orderData.phone,
        totalAmount,
        orderedItems,
        orderDate: new Date().toISOString(),
      };

      // 🔥 Send to backend
      await api.post("/orders", payload);

      // 🔥 Save in localStorage (Order History)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      existingOrders.push(payload);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      clearCart();
      setShowForm(false);
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      {cart.map((item) => {
        const quantity = item.quantity || 1;
        const subtotal = item.price_per_kg * quantity;

        return (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Product Info */}
            <div className="flex-1">
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-gray-600">₹{item.price_per_kg}</p>
              <p className="text-gray-800 font-medium mt-1">
                Subtotal: ₹{subtotal.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-bold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-bold hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 hover:text-red-700 transition"
              title="Remove item"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        );
      })}

      {cart.length > 0 && (
        <>
          <div className="text-right mt-6 font-bold text-xl">
            Total: ₹{totalAmount.toFixed(2)}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-green-600 transition"
          >
            Place Order
          </button>
        </>
      )}

      {/* Order Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter your details</h2>
            {message && <p className="mb-3 text-red-500">{message}</p>}
            <form onSubmit={placeOrder} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={orderData.name}
                  onChange={(e) =>
                    setOrderData({ ...orderData, name: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit phone number"
                  value={orderData.phone}
                  onChange={(e) =>
                    setOrderData({ ...orderData, phone: e.target.value })
                  }
                  required
                  pattern="\d{10}"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Address</label>
                <textarea
                  placeholder="Address"
                  value={orderData.address}
                  onChange={(e) =>
                    setOrderData({ ...orderData, address: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  {loading ? "Placing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import api from "../api/axios";

// export default function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const [showForm, setShowForm] = useState(false);
//   const [orderData, setOrderData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price_per_kg * (item.quantity || 1),
//     0
//   );

//   async function placeOrder(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       // 🛒 Transform cart into backend's required format
//       const orderedItems = cart.map((item) => ({
//         productId: item.id, // productId is a string in your API
//         quantityInKg: item.quantity || 1,
//       }));

//       const payload = {
//         name: orderData.name,
//         address: orderData.address,
//         phoneNumber: orderData.phone,
//         orderedItems,
//       };

//       await api.post("/orders", payload); // Make sure endpoint ends with "/"

//       setMessage("✅ Order placed successfully!");
//       clearCart();
//       setShowForm(false);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

//       {cart.length === 0 && <p>Your cart is empty.</p>}

//       {cart.map((item) => (
//         <div
//           key={item.id}
//           className="flex justify-between items-center p-2 border-b"
//         >
//           <div>
//             <p className="font-semibold">{item.name}</p>
//             <p>₹{item.price_per_kg} / kg</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
//               className="px-2 py-1 bg-gray-300 rounded"
//               disabled={(item.quantity || 1) <= 1}
//             >
//               -
//             </button>
//             <span>{item.quantity || 1}</span>
//             <button
//               onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
//               className="px-2 py-1 bg-gray-300 rounded"
//             >
//               +
//             </button>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-red-500 ml-2"
//             >
//               ❌
//             </button>
//           </div>
//         </div>
//       ))}

//       {cart.length > 0 && (
//         <>
//           <div className="text-right mt-4 font-bold text-lg">
//             Total: ₹{totalAmount}
//           </div>
//           <button
//             onClick={() => setShowForm(true)}
//             className="w-full bg-green-500 text-white py-2 rounded mt-4"
//           >
//             Place Order
//           </button>
//         </>
//       )}

//       {/* Order Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Enter your details</h2>
//             {message && <p className="mb-2">{message}</p>}
//             <form onSubmit={placeOrder} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={orderData.name}
//                 onChange={(e) =>
//                   setOrderData({ ...orderData, name: e.target.value })
//                 }
//                 required
//                 className="w-full border rounded p-2"
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 value={orderData.phone}
//                 onChange={(e) =>
//                   setOrderData({ ...orderData, phone: e.target.value })
//                 }
//                 required
//                 className="w-full border rounded p-2"
//               />
//               <textarea
//                 placeholder="Address"
//                 value={orderData.address}
//                 onChange={(e) =>
//                   setOrderData({ ...orderData, address: e.target.value })
//                 }
//                 required
//                 className="w-full border rounded p-2"
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 bg-green-500 text-white rounded"
//                 >
//                   {loading ? "Placing..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Cart.jsx
// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const [showForm, setShowForm] = useState(false);
//   const [orderData, setOrderData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price_per_kg * (item.quantity || 1),
//     0
//   );

//   async function placeOrder(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // Phone validation
//     if (!/^\d{10}$/.test(orderData.phone)) {
//       setMessage("❌ Phone number must be 10 digits.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const orderedItems = cart.map((item) => ({
//         productId: item.id,
//         quantityInKg: item.quantity || 1,
//       }));

//       const payload = {
//         name: orderData.name,
//         address: orderData.address,
//         phoneNumber: orderData.phone,
//         orderedItems,
//       };

//       await api.post("/orders", payload);

//       clearCart();
//       setShowForm(false);
//       navigate("/order-success");
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

//       {cart.length === 0 && <p>Your cart is empty.</p>}

//       {cart.map((item) => (
//         <div
//           key={item.id}
//           className="flex justify-between items-center p-2 border-b"
//         >
//           <div>
//             <p className="font-semibold">{item.name}</p>
//             <p>₹{item.price_per_kg} / kg</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
//               className="px-2 py-1 bg-gray-300 rounded"
//               disabled={(item.quantity || 1) <= 1}
//             >
//               -
//             </button>
//             <span>{item.quantity || 1}</span>
//             <button
//               onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
//               className="px-2 py-1 bg-gray-300 rounded"
//             >
//               +
//             </button>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-red-500 ml-2"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}

//       {cart.length > 0 && (
//         <>
//           <div className="text-right mt-4 font-bold text-lg">
//             Total: ₹{totalAmount}
//           </div>
//           <button
//             onClick={() => setShowForm(true)}
//             className="w-full bg-green-500 text-white py-2 rounded mt-4"
//           >
//             Place Order
//           </button>
//         </>
//       )}

//       {/* Order Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Enter your details</h2>
//             {message && <p className="mb-2 text-red-500">{message}</p>}
//             <form onSubmit={placeOrder} className="space-y-3">
//               <div>
//                 <label className="block mb-1">Name</label>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={orderData.name}
//                   onChange={(e) =>
//                     setOrderData({ ...orderData, name: e.target.value })
//                   }
//                   required
//                   className="w-full border rounded p-2"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Phone Number</label>
//                 <input
//                   type="tel"
//                   placeholder="10-digit phone number"
//                   value={orderData.phone}
//                   onChange={(e) =>
//                     setOrderData({ ...orderData, phone: e.target.value })
//                   }
//                   required
//                   pattern="\d{10}"
//                   className="w-full border rounded p-2"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Address</label>
//                 <textarea
//                   placeholder="Address"
//                   value={orderData.address}
//                   onChange={(e) =>
//                     setOrderData({ ...orderData, address: e.target.value })
//                   }
//                   required
//                   className="w-full border rounded p-2"
//                 />
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 bg-green-500 text-white rounded"
//                 >
//                   {loading ? "Placing..." : "Place Order"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Cart.jsx
// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { FiTrash2 } from "react-icons/fi";

// export default function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const [showForm, setShowForm] = useState(false);
//   const [orderData, setOrderData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price_per_kg * (item.quantity || 1),
//     0
//   );

//   async function placeOrder(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // Phone validation
//     if (!/^\d{10}$/.test(orderData.phone)) {
//       setMessage("❌ Phone number must be 10 digits.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const orderedItems = cart.map((item) => ({
//         productId: item.id,
//         quantityInKg: item.quantity || 1,
//       }));

//       const payload = {
//         name: orderData.name,
//         address: orderData.address,
//         phoneNumber: orderData.phone,
//         orderedItems,
//       };

//       await api.post("/orders", payload);

//       clearCart();
//       setShowForm(false);
//       navigate("/order-success");
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

//       {cart.length === 0 && (
//         <p className="text-center text-gray-500">Your cart is empty.</p>
//       )}

//       {cart.map((item) => {
//         const quantity = item.quantity || 1;
//         const subtotal = item.price_per_kg * quantity;

//         return (
//           <div
//             key={item.id}
//             className="flex items-center justify-between border rounded-lg p-4 mb-4 shadow-sm bg-white"
//           >
//             {/* Product Info */}
//             <div className="flex-1">
//               <p className="font-semibold text-lg">{item.name}</p>
//               <p className="text-gray-600">₹{item.price_per_kg} / kg</p>
//               <p className="text-gray-800 font-medium mt-1">
//                 Subtotal: ₹{subtotal.toFixed(2)}
//               </p>
//             </div>

//             {/* Quantity Controls */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => updateQuantity(item.id, quantity - 1)}
//                 className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-bold"
//                 disabled={quantity <= 1}
//               >
//                 -
//               </button>
//               <span className="text-lg font-semibold">{quantity}</span>
//               <button
//                 onClick={() => updateQuantity(item.id, quantity + 1)}
//                 className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-bold"
//               >
//                 +
//               </button>
//             </div>

//             {/* Delete Button */}
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="ml-4 text-red-500 hover:text-red-700 transition"
//               title="Remove item"
//             >
//               <FiTrash2 size={20} />
//             </button>
//           </div>
//         );
//       })}

//       {cart.length > 0 && (
//         <>
//           <div className="text-right mt-6 font-bold text-xl">
//             Total: ₹{totalAmount.toFixed(2)}
//           </div>
//           <button
//             onClick={() => setShowForm(true)}
//             className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-green-600 transition"
//           >
//             Place Order
//           </button>
//         </>
//       )}

//       {/* Order Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Enter your details</h2>
//             {message && <p className="mb-3 text-red-500">{message}</p>}
//             <form onSubmit={placeOrder} className="space-y-4">
//               <div>
//                 <label className="block mb-1 font-medium">Name</label>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={orderData.name}
//                   onChange={(e) =>
//                     setOrderData({ ...orderData, name: e.target.value })
//                   }
//                   required
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Phone Number</label>
//                 <input
//                   type="tel"
//                   placeholder="10-digit phone number"
//                   value={orderData.phone}
//                   onChange={(e) =>
//                     setOrderData({ ...orderData, phone: e.target.value })
//                   }
//                   required
//                   pattern="\d{10}"
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Address</label>
//                 <textarea
//                   placeholder="Address"
//                   value={orderData.address}
//                   onChange={(e) =>
//                     setOrderData({ ...orderData, address: e.target.value })
//                   }
//                   required
//                   className="w-full border rounded-lg p-2"
//                 />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 bg-gray-300 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                 >
//                   {loading ? "Placing..." : "Place Order"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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
        quantityInKg: item.quantity || 1,
      }));

      const payload = {
        name: orderData.name,
        address: orderData.address,
        phoneNumber: orderData.phone,
        orderedItems,
      };

      await api.post("/orders", payload);

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
              <p className="text-gray-600">₹{item.price_per_kg} / kg</p>
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

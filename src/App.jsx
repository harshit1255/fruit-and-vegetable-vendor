// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import OrderSuccess from "./pages/OrderSuccess";
// import OrderHistory from "./pages/OrderHistory";
// import { CartProvider, useCart } from "./context/CartContext";
// import { FiShoppingCart, FiClipboard } from "react-icons/fi";
// import api from "./api/axios"; // ✅ Make sure you have axios instance

// // 🔥 Navbar Component
// function Navbar() {
//   const { cart } = useCart();

//   return (
//     <nav className="bg-green-500 text-white p-4 flex justify-between items-center shadow-md">
//       {/* Home Link */}
//       <Link
//         to="/"
//         className="text-lg font-semibold hover:opacity-80 transition"
//       >
//         Home
//       </Link>

//       {/* Right Side Icons */}
//       <div className="flex gap-6 items-center">
//         {/* Order History Icon */}
//         <Link to="/orders" className="relative hover:opacity-80 transition">
//           <FiClipboard size={24} />
//         </Link>

//         {/* Cart Icon with Red Dot */}
//         <Link to="/cart" className="relative hover:opacity-80 transition">
//           <FiShoppingCart size={24} />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               {cart.length}
//             </span>
//           )}
//         </Link>
//       </div>
//     </nav>
//   );
// }

// function DiscountMarquee() {
//   const [discountText, setDiscountText] = useState("");

//   useEffect(() => {
//     async function fetchDiscount() {
//       try {
//         const res = await api.get("/discount");
//         if (res.data?.success) {
//           setDiscountText(res.data.data?.text);
//         }
//       } catch (err) {
//         console.error("Failed to fetch discount", err);
//       }
//     }
//     fetchDiscount();
//   }, []);

//   if (!discountText) return null;

//   return (
//     <div className="bg-yellow-300 text-black py-2 overflow-hidden shadow-md">
//       <div
//         className="marquee-text whitespace-nowrap text-center font-medium text-lg"
//         key={discountText} // Forces restart when text changes
//       >
//         {discountText}
//       </div>

//       <style>
//         {`
//           @keyframes scrollFirst {
//             0% { transform: translateX(50%); }  /* Start from center */
//             100% { transform: translateX(-100%); } /* Move left fully */
//           }
//           @keyframes scrollLoop {
//             0% { transform: translateX(100%); }  /* Start from right */
//             100% { transform: translateX(-100%); } /* Move left fully */
//           }

//           .marquee-text {
//             display: inline-block;
//             animation: scrollFirst 6s linear 1, scrollLoop 10s linear infinite;
//             animation-delay: 0s, 6s; /* second starts after first finishes */
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// // 🔥 App Component
// export default function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <Navbar />
//         <DiscountMarquee /> {/* ✅ Added here */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/order-success" element={<OrderSuccess />} />
//           <Route path="/orders" element={<OrderHistory />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }

import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";
import { CartProvider, useCart } from "./context/CartContext";
import { FiShoppingCart, FiClipboard } from "react-icons/fi";
import api from "./api/axios"; // ✅ axios instance

// 🔥 Navbar Component
function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-green-500 text-white p-4 flex justify-between items-center shadow-md">
      <Link
        to="/"
        className="text-lg font-semibold hover:opacity-80 transition"
      >
        Home
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/orders" className="relative hover:opacity-80 transition">
          <FiClipboard size={24} />
        </Link>

        <Link to="/cart" className="relative hover:opacity-80 transition">
          <FiShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

// 🔥 Discount Marquee (homepage only)
function DiscountMarquee() {
  const [discountText, setDiscountText] = useState("");
  const location = useLocation(); // ✅ Get current path

  useEffect(() => {
    async function fetchDiscount() {
      try {
        const res = await api.get("/discount");
        if (res.data?.success) {
          setDiscountText(res.data.data?.text);
        }
      } catch (err) {
        console.error("Failed to fetch discount", err);
      }
    }
    fetchDiscount();
  }, []);

  // ✅ Only render on homepage
  if (location.pathname !== "/" || !discountText) return null;

  return (
    <div className="bg-yellow-300 text-black py-2 overflow-hidden shadow-md">
      <div
        className="marquee-text whitespace-nowrap text-center font-medium text-lg"
        key={discountText}
      >
        {discountText}
      </div>
      <style>
        {`
          @keyframes scrollFirst {
            0% { transform: translateX(50%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes scrollLoop {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .marquee-text {
            display: inline-block;
            animation: scrollFirst 6s linear 1, scrollLoop 10s linear infinite;
            animation-delay: 0s, 6s;
          }
        `}
      </style>
    </div>
  );
}

// 🔥 App Component
export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <DiscountMarquee /> {/* ✅ Renders only on homepage */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

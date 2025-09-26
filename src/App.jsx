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
import { FiShoppingCart, FiClipboard, FiTag } from "react-icons/fi";
import api from "./api/axios"; // ✅ axios instance

// 🔥 Navbar Component
function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-emerald-800 to-teal-700 text-white shadow-lg border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow text-white">
            Sharma <span className="text-white/90">Vegetable</span> & Fruits
          </span>
        </Link>

        <div className="flex gap-6 items-center text-white/95">
          <Link to="/orders" className="relative transition text-white/90 hover:text-white">
            <FiClipboard size={22} />
          </Link>

          <Link to="/cart" className="relative transition text-white/90 hover:text-white">
            <FiShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="badge-danger absolute -top-2 -right-2 w-5 h-5">{cart.length}</span>
            )}
          </Link>
        </div>
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
    <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white">
      <div className="container py-2">
        <div className="relative overflow-hidden rounded-xl shadow-md ring-1 ring-white/20">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
          <div className="flex items-center gap-3 px-4 py-2">
            <FiTag size={18} className="shrink-0 opacity-90" />
            <div className="relative flex-1 overflow-hidden">
              <div className="marquee-track" key={discountText}>
                <span className="marquee-item font-medium text-sm sm:text-base tracking-wide">{discountText}</span>
                <span className="marquee-item font-medium text-sm sm:text-base tracking-wide" aria-hidden="true">{discountText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .marquee-track {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
            will-change: transform;
            padding-left: 100%;
            animation: marqueeLoop 14s linear infinite;
          }
          .marquee-item { padding-inline: 2rem; }
          @keyframes marqueeLoop {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track:hover { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track { animation: none; }
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

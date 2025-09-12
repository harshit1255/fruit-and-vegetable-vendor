// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import { CartProvider } from "./context/CartContext";
// import AddProduct from "./pages/AddProduct";

// export default function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <nav className="bg-green-500 text-white p-4 flex justify-between">
//           <Link to="/">Home</Link>
//           <Link to="/cart">Cart</Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }

// src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import { CartProvider, useCart } from "./context/CartContext";
// import { FiShoppingCart } from "react-icons/fi";

// function Navbar() {
//   const { cart } = useCart();

//   return (
//     <nav className="bg-green-500 text-white p-4 flex justify-between items-center">
//       <Link to="/" className="text-lg font-semibold">
//         Home
//       </Link>

//       {/* Cart Icon with Red Dot */}
//       <Link to="/cart" className="relative">
//         <FiShoppingCart size={24} />
//         {cart.length > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//             {cart.length}
//           </span>
//         )}
//       </Link>
//     </nav>
//   );
// }

// export default function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }

// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess"; // ✅ Import new page
import { CartProvider, useCart } from "./context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import AddProduct from "./pages/AddProduct";

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-green-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        Home
      </Link>

      {/* Cart Icon with Red Dot */}
      <Link to="/cart" className="relative">
        <FiShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />{" "}
          {/* ✅ Add route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

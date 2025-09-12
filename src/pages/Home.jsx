// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useCart } from "../context/CartContext";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [popup, setPopup] = useState("");
//   const { addToCart } = useCart(); // Get cart function from context

//   // Fetch products from backend
//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await api.get("products/");
//         setProducts(res.data.data);
//         console.log(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch products", err);
//       }
//     }
//     fetchProducts();
//   }, []);

//   // Handle Add to Cart
//   function handleAddToCart(product) {
//     addToCart(product); // Add to global cart
//     setPopup(`${product.name} added to cart!`);

//     // Hide popup after 2s
//     setTimeout(() => setPopup(""), 2000);
//   }

//   return (
//     <div className="p-6">
//       {/* Popup Notification */}
//       {popup && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition">
//           {popup}
//         </div>
//       )}

//       {/* Product List */}
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {products.map((p) => (
//           <div
//             key={p.id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             {/* Product Image */}
//             {p.image && (
//               <img
//                 src={`https://fruit-store-backend-production.up.railway.app${p.image}`}
//                 alt={p.name}
//                 className="w-full h-32 object-cover mb-2 rounded"
//               />
//             )}
//             <h2 className="text-lg font-semibold">{p.name}</h2>
//             <p className="text-gray-700">₹{p.price_per_kg}/kg</p>
//             <button
//               onClick={() => handleAddToCart(p)}
//               className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState({});
  const [popup, setPopup] = useState("");
  const { addToCart } = useCart();

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("products/");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Handle Add to Cart
  function handleAddToCart(product) {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));

    setPopup(`${product.name} added to cart!`);
    setTimeout(() => setPopup(""), 2000);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Popup Notification */}
      {popup && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition">
          {popup}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">
        Fresh Vegetables & Fruits
      </h1>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="w-full h-10 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4 flex flex-col items-center"
            >
              {/* Product Image */}
              <div className="w-full h-40 flex items-center justify-center mb-3 overflow-hidden rounded-lg">
                {p.image ? (
                  <img
                    src={`https://fruit-store-backend-production.up.railway.app${p.image}`}
                    alt={p.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Details */}
              <h2 className="text-lg font-semibold text-center">{p.name}</h2>
              <p className="text-gray-700 mb-3">₹{p.price_per_kg}/kg</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(p)}
                disabled={addedItems[p.id]}
                className={`w-full py-2 rounded-lg font-medium transition ${
                  addedItems[p.id]
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {addedItems[p.id] ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

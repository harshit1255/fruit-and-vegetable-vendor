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
    <div className="container py-6">
      {/* Popup Notification */}
      {popup && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition">
          {popup}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 text-white shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="px-4 sm:px-8 py-8 sm:py-12 relative">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow">
            Sharma <span className="text-white/90">Vegetable</span> & Fruits
          </h1>
          <p className="mt-2 text-white/90 max-w-2xl text-sm sm:text-base">
            Fresh, quality produce delivered to your doorstep.
          </p>
          <a href="#products" className="btn-primary mt-4 inline-flex px-4 py-2 text-sm sm:text-base">
            Shop Now
          </a>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div id="products" className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="card hover:scale-[1.02] transition-transform p-4 flex flex-col items-center"
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
              <p className="text-gray-700 mb-3">₹{p.price_per_kg}</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(p)}
                disabled={addedItems[p.id]}
                className={`btn w-full py-2 ${
                  addedItems[p.id]
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "btn-primary"
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

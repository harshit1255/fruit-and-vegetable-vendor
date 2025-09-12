// src/components/ProductCard.jsx
export default function ProductCard({ product, addToCart }) {
  const baseurl = "https://fruit-store-backend-production.up.railway.app";
  const imageUrl = baseurl + product.image;
  console.log(imageUrl);
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={imageUrl}
        loading="lazy"
        alt={product.name}
        className="h-32 w-full object-cover"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">₹{product.price_per_kg}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}

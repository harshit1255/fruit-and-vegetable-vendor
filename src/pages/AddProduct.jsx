import { useState } from "react";
import api from "../api/axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price_per_kg", price);
    formData.append("in_stock", "true"); // ✅ Always true
    if (image) formData.append("image_file", image);

    try {
      console.log(formData.values);
      await api.post("/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Product added successfully!");
      setName("");
      setPrice("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product");
    }
  }

  return (
    <div className="container max-w-md py-6">
      <div className="card p-6">
        <h1 className="heading-2 mb-4">Add Product</h1>
        {message && <p className="mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Price per kg</label>
            <input
              type="number"
              placeholder="Price per kg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Image file</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full py-2">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

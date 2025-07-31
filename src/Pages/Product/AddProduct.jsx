import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

// Categories for selection
const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const AddProduct = () => {
  const navigate = useNavigate();

  // Product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    discount: "",
    afterdiscountprice: "",
    description: "",
    image: "",
    category: "",
    stock: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

      // ✅ Get the max existing ID and increment by 1
      const existingIds = existingProducts.map((p) => p.id || 0);
      const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 219;

      const newProduct = {
        ...product,
        id: nextId,
        price: parseFloat(product.price),
        discount: parseFloat(product.discount),
        afterdiscountprice: parseFloat(product.afterdiscountprice),
        stock: parseInt(product.stock),
        rating: {
          rate: (Math.random() * 5).toFixed(1),
          count: Math.floor(Math.random() * 100) + 1,
        },
      };

      // Save updated list to localStorage
      localStorage.setItem("products", JSON.stringify([...existingProducts, newProduct]));

      toast.success(" Product added successfully!");
      setTimeout(() => navigate("/product"), 1500);
    } catch (err) {
      console.error("Add product failed:", err);
      toast.error(" Failed to add product");
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen py-10">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={product.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price in ₹"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount in % (max 100)"
            value={product.discount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            name="afterdiscountprice"
            placeholder="Discounted Price in ₹"
            value={product.afterdiscountprice}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock / Quantity"
            value={product.stock}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </form>

        <div className="mt-4 text-center">
          <NavLink to="/">
            <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
              Go Back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

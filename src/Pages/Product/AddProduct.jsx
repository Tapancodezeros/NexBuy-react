import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

// Categories for selection
const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const AddProduct = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);
    if (!isNaN(price) && !isNaN(discount)) {
      if (discount > 99 || discount < 1) {
        toast.warn("Discount must be between & Equal to 0% and 100%");
        setProduct((prev) => ({ ...prev, discount: 5 }));
      } else {
        const discountedPrice = price - (price * discount) / 100;
        setProduct((prev) => ({
          ...prev,
          afterdiscountprice: discountedPrice.toFixed(2),
        }));
      }
    }
  }, [product.price, product.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "discount" && parseFloat(value) > 100 || parseFloat(value) < 0 ) {
      toast.warn("Discount cannot exceed 100% and not 0 or less");
      return;
    }

    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

      const existingIds = existingProducts.map((p) => p.id || 0);
      const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 21;

      const newProduct = {
        ...product,
        id: nextId,
        price: parseFloat(product.price),
        discount: parseFloat(product.discount),
        afterdiscountprice: parseFloat(product.afterdiscountprice),
        stock: parseInt(product.stock),
        rating: {
          rate: (Math.random() * 5).toFixed(1),
          count: Math.floor(Math.random() * 500) + 1,
        },
      };

      localStorage.setItem("products", JSON.stringify([...existingProducts, newProduct]));

      toast.success("Product added successfully!");
      setTimeout(() => navigate("/product"), 1500);
    } catch (err) {
      console.error("Add product failed:", err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-white to-white px-4 py-20 text-center">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

        <form onSubmit={handleSubmit} className="max-w-m mx-auto space-y-3">
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
            readOnly
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
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
          <NavLink to="/product">
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

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Static categories
const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];
    const targetProduct = localProducts.find((p) => p.id === parseInt(id));

    if (!targetProduct) {
      toast.error("Product not found");
      return navigate("/product");
    }
    setProduct(targetProduct);
  }, [id, navigate]);

  // Auto-calculate afterdiscountprice
  useEffect(() => {
    if (!product) return;

    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);

    if (!isNaN(price) && !isNaN(discount)) {
      if (discount > 100 || discount < 0) {
        toast.warn("Discount must be between 0% and 100%");
        setProduct((prev) => ({ ...prev, discount: 99 }));
      } else {
        const afterDiscount = price - (price * discount) / 100;
        setProduct((prev) => ({
          ...prev,
          afterdiscountprice: afterDiscount.toFixed(2),
        }));
      }
    }
  }, [product?.price, product?.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = (JSON.parse(localStorage.getItem("products")) || []).map((p) =>
      p.id === product.id
        ? {
            ...product,
            price: parseFloat(product.price),
            discount: parseFloat(product.discount),
            afterdiscountprice: parseFloat(product.afterdiscountprice),
            stock: parseInt(product.stock),
          }
        : p
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product updated successfully!");
    navigate("/product");
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-blue-100 py-16">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            required
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            required
          />

          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            required
          />

          <input
            type="number"
            name="afterdiscountprice"
            value={product.afterdiscountprice}
            readOnly
            placeholder="Discounted Price"
            className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed text-gray-500"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            required
          />

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            required
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
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full p-3 border rounded-md focus:outline-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all"
          >
            ✅ Update Product
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <NavLink to="/product">
            <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
              ⬅️ Go Back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

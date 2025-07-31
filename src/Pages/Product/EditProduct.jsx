import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];
    const target = localProducts.find((p) => p.id === parseInt(id));
    if (!target) {
      toast.error("Product not found");
      return navigate("/product");
    }
    setProduct(target);
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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
    <div className="bg-blue-100 min-h-screen py-10 my-18">
      <div className="max-w-lg mx-auto p-6 bg-amber-50 shadow rounded hover:z-20">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" value={product.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
          <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
          <input type="number" name="discount" value={product.discount} onChange={handleChange} placeholder="Discount (%)" className="w-full p-2 border rounded" required />
          <input type="number" name="afterdiscountprice" value={product.afterdiscountprice} onChange={handleChange} placeholder="Discounted Price" className="w-full p-2 border rounded" required />
          <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
          <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
          <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required />
          
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Update Product
         </button>
         <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 mb-8 "> 
          <NavLink to="/product">
            <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition ">
              ⬅️Go Back
            </button>
          </NavLink>
         </div>
        </form>
      </div>
      
    </div>
  );
};

export default EditProduct;

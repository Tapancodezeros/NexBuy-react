import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components/UI/Header";
import { Footer } from "../components/UI/Footer";
const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: "prev +1",
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
    pice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));  
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Calculate new ID based on existing products
    const lastId = existingProducts.length > 0
      ? Math.max(...existingProducts.map((p) => p.id || 21))
      : 0;

    const newProduct = {
      ...product,
      id: lastId + 1, // Assign unique ID
      price: parseFloat(product.price),
    };

    // Save to localStorage with new ID
    localStorage.setItem("products", JSON.stringify([...existingProducts, newProduct]));

    toast.success("Product added successfully!");
    setTimeout(() => navigate("/product"), 1500);
  } catch (err) {
    console.error("Add product failed:", err);
    toast.error("Failed to add product");
  }
};


  return (
    <div className="bg-pink-100">
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <Header/>
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
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
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input
          type="number"
          name="pice"
          placeholder="pice"
          value={product.pice}
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

      <NavLink to="/product">
        <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200">
          Go Back
        </button>
      </NavLink>
      
    </div>
   <Footer/>
   </div>    
);
};

export default AddProduct;

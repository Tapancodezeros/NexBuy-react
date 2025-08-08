import React, { useEffect, useState } from "react";
import {fetchCategories,fetchProductsByCategory} from "../../api/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const navigate = useNavigate();
  const getLocalProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this Product?")) return;
    const updatedProducts = getLocalProducts().filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    
    toast.success("🗑️ Product deleted successfully");
    loadProducts();
  };
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };
  const loadProducts = async () => {
    const cats = await fetchCategories();
    setCategories(cats);
    const localProducts = getLocalProducts();
    const productsByCategory = await Promise.all(
      cats.map(async (cat) => {
        const apiProducts = await fetchProductsByCategory(cat);
        const localForCat = localProducts.filter((p) => p.category === cat);
        return {
          category: cat,
          products: [...apiProducts, ...localForCat],
        };
      })
    );
    setCategoryProducts(productsByCategory);
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const handleChange = async (e) => {
    const selected = e.target.value;
    setSelectedCat(selected);
    const localProducts = getLocalProducts();
    if (selected === "all") {
      loadProducts();
    } else {
      const apiProducts = await fetchProductsByCategory(selected);
      const localForCat = localProducts.filter((p) => p.category === selected);
      setCategoryProducts([
        {category: selected, products: [...apiProducts, ...localForCat],},
      ]);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-white px-4 py-10 my-18">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <NavLink to="/">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition">
              ⬅️ Go Back
            </button>
          </NavLink>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={selectedCat}
              onChange={handleChange}
              className="min-w-[180px] p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <NavLink
              to="/add-product"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition duration-200">
              ✚ Add Product
            </NavLink>
          </div>
        </div>
        {categoryProducts.map(({ category, products }) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              {category}
            </h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => {
                const isLocal = product.id > 20;
                const outofstock =
                  isLocal && product.stock <= 0;
                const fewstock =
                  isLocal && product.stock <=5 && product.stock>=1;   
                const price = product.afterdiscountprice ? product.afterdiscountprice.toFixed(0) : (product.price * 83).toFixed(0);
                const originalPrice = product.afterdiscountprice ? product.price.toFixed(0) : null;
                  const discount = product.discount? product.discount : null;
                return (
                  <NavLink to={`/product/${product.id}`} key={product.id} className="relative bg-white rounded-2xl shadow-md 
                  hover:shadow-blue-500/40 transition-all duration-200 overflow-hidden flex flex-col">
                    <div className="relative">
                      <img src={product.image} alt={product.title} className="h-48 w-full object-contain p-4 bg-gray-50"/>
                      {outofstock && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">Out of Stock</span>)} 
                      {fewstock && (
                        <span className="absolute bottom-2 left-2 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded">
                          last {product.stock} pic left
                        </span>)}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex flex-col">
                            {originalPrice ? (
                              <>
                                <span className="text-sm text-gray-500 line-through">Original Price ₹{originalPrice}</span>
                                <span className="text-blue-400 font-extrabold text-lg">Discount {discount}%</span>
                                <span className="text-green-600 font-bold text-lg">Final Price ₹{price}</span>
                              </>
                            ) : (
                              <span className="text-green-600 font-bold text-lg">Final Price ₹{price}</span>
                            )}
                          </div>
                          {product.rating?.rate ? (
                            <span className="text-sm bg-yellow-100 px-2 py-1 rounded text-yellow-800">⭐ {product.rating.rate}</span>
                          ) : (
                            <span className="text-sm italic text-gray-400">
                              No Rating
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-center my-4">
                        {outofstock ?(
                        <span className="text-sm text-red-600 hover:underline">Out of Stock</span>
                       ) : (
                        <span className="text-sm text-blue-600 hover:underline">View Product ➡️</span>
                        )}
                      </div>
                    </div>
                    {isLocal && (
                      <div
                        className="flex justify-center gap-3 p-3 border-t border-gray-100 bg-gray-50"
                        onClick={(e) => e.preventDefault()}>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="bg-black hover:bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm transition">
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-300 hover:bg-red-500 text-black px-4 py-1.5 rounded-lg text-sm transition">
                          ❌ Delete
                        </button>
                      </div>
                    )} 
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Product;

import React, { useEffect, useState } from "react";
import { fetchCategories, fetchProductsByCategory } from "../../api/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const navigate = useNavigate();

  // Get local products from localStorage
  const getLocalProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };

  // Delete local product
  const handleDelete = (id) => {
    const updatedProducts = getLocalProducts().filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("🗑️ Product deleted successfully");
    loadProducts();
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  // Load categories and all products
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

  // Handle category selection
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
        {
          category: selected,
          products: [...apiProducts, ...localForCat],
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 my-14">
      <div className="max-w-7xl mx-auto">
        {/* Top controls */}
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
              className="min-w-[180px] p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <NavLink
              to="/add-product"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition duration-200"
            >
              ✚ Add Product
            </NavLink>
          </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.map(({ category, products }) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              {category}
            </h3>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => {
                const isLocal = product.id > 20;
                const price = product.afterdiscountprice
                  ? (product.afterdiscountprice).toFixed(0)
                  : (product.price * 83).toFixed(0);
                const originalPrice = product.afterdiscountprice
                  ? (product.price * 83).toFixed(0)
                  : null;
                  
                  console.log("🚀 ~ product:", product)
                return (
                  <div
                    key={product.id}
                    className="relative bg-white rounded-2xl shadow-md hover:shadow-blue-500/40 transition-all duration-200 overflow-hidden flex flex-col"
                  >
                    <NavLink to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 w-full object-contain p-4 bg-gray-50"
                      />
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-lg truncate">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 capitalize">
                            {product.category}
                          </p>

                          <div className="mt-2 flex justify-between items-center">
                            <div className="flex flex-col">
                              {originalPrice ? (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{originalPrice}
                                  </span>
                                  <span className="text-green-600 font-bold text-lg">
                                    ₹{price}
                                  </span>
                                </>
                              ) : (
                                <span className="text-green-600 font-bold text-lg">
                                  ₹{price}
                                </span>
                              )}
                            </div>

                            {product.rating?.rate ? (
                              <span className="text-sm bg-yellow-100 px-2 py-1 rounded text-yellow-800">
                                ⭐ {product.rating.rate}
                              </span>
                            ) : (
                              <span className="text-sm italic text-gray-400">
                                No Rating
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4">
                          <span className="text-sm text-blue-600 hover:underline">
                            View Product ➡️
                          </span>
                        </div>
                      </div>
                    </NavLink>

                    {/* Edit & Delete for Local Products */}
                    {isLocal && (
                      <div className="flex justify-center gap-3 p-3 border-t border-gray-100 bg-gray-50">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
                        >
                          ❌ Delete
                        </button>
                      </div>
                    )}
                  </div>
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

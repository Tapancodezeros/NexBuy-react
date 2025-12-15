import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../api/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const [categoryProducts, setCategoryProducts] = useState([]); // Products grouped by category
  const [categories, setCategories] = useState([]); // All available categories
  const [selectedCat, setSelectedCat] = useState("all"); // Selected category in filter
  const navigate = useNavigate();

  // Helper to get locally stored products (created via add-product)
  const getLocalProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };

  // Delete product by ID and update localStorage
  const handleDelete = (id) => {
    const updatedProducts = getLocalProducts().filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("🗑️ Product deleted successfully");
    loadProducts(); // Refresh the displayed products
  };

  // Navigate to edit page for a product
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  // Load all products: API + local, merged category-wise
  const loadProducts = async () => {
    const cats = await fetchCategories(); // API call for categories
    setCategories(cats);

    // Get products from API for each category
    const apiCategoryWise = await Promise.all(
      cats.map(async (cat) => {
        const products = await fetchProductsByCategory(cat);
        return { category: cat, products };
      })
    );

    const localProducts = getLocalProducts();

    // Merge API and local products for each category
    const merged = apiCategoryWise.map((group) => {
      const localForCat = localProducts.filter(
        (p) => p.category === group.category
      );
      return {
        category: group.category,
        products: [...group.products, ...localForCat],
      };
    });

    setCategoryProducts(merged);
  };

  // Load products when component mounts
  useEffect(() => {
    loadProducts();
  }, []);

  // Handle dropdown change and load selected category only
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
    <div className="min-h-screen bg-gradient-secondary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                🛍️ Product Catalog
              </h1>
              <p className="text-gray-600">
                Discover amazing products across all categories
              </p>
            </div>
            
            <NavLink to="/">
              <button className="btn-secondary flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            </NavLink>
          </div>

          {/* Category Filter and Add Product */}
          <div className="card p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                  </div>
                  <select
                    className="form-select pl-10 w-full"
                    value={selectedCat}
                    onChange={handleChange}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <NavLink to="/add-product" className="w-full sm:w-auto">
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Display Products by Category */}
        {categoryProducts.map(({ category, products }) => (
          <div key={category} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 capitalize">
                  {category}
                </h3>
                <p className="text-gray-600">
                  {products.length} product{products.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                  const isLocal = product.id > 20; // Local products have id > 20

                  return (
                    <div
                      key={product.id}
                      className="group card card-hover animate-slide-up overflow-hidden flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <NavLink to={`/product/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-48 w-full object-contain p-4 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                        </NavLink>
                        
                        {/* Badge for local products */}
                        {isLocal && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                              Custom
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </h4>
                          
                          <p className="text-sm text-gray-500 mb-3 capitalize flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {product.category}
                          </p>

                          {/* Price and Rating */}
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold text-green-600">
                                ₹{product.afterdiscountprice || (product.price * 83).toFixed(0)}
                              </span>
                              {product.rating?.rate && (
                                <div className="flex items-center gap-1">
                                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                                    ⭐ {product.rating.rate}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {!product.rating?.rate && (
                              <span className="text-sm italic text-gray-400">
                                No rating available
                              </span>
                            )}
                          </div>
                        </div>

                        {/* View Product Link */}
                        <div className="mt-auto">
                          <NavLink to={`/product/${product.id}`}>
                            <button className="w-full btn-secondary btn-sm flex items-center justify-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Details
                            </button>
                          </NavLink>
                        </div>
                      </div>

                      {/* Local Product Actions */}
                      {isLocal && (
                        <div className="flex gap-2 p-4 pt-0">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State for Category */
              <div className="card text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 4v2m0-4h2m-2 0h-2m4-8v8m0 0v2m0-2h2m-2 0h-2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    No products available in the {category} category yet
                  </p>
                  <NavLink to="/add-product">
                    <button className="btn-primary">
                      Add First Product
                    </button>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

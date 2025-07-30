import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../api/apiService";
import { NavLink } from "react-router-dom";

const Product = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");

  const getLocalProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };

  useEffect(() => {
    const loadInitial = async () => {
      const cats = await fetchCategories();
      setCategories(cats);

      const apiCategoryWise = await Promise.all(
        cats.map(async (cat) => {
          const products = await fetchProductsByCategory(cat);
          return { category: cat, products };
        })
      );

      const localProducts = getLocalProducts();

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

    loadInitial();
  }, []);

  const handleChange = async (e) => {
    const selected = e.target.value;
    setSelectedCat(selected);

    const localProducts = getLocalProducts();

    if (selected === "all") {
      const apiCategoryWise = await Promise.all(
        categories.map(async (cat) => {
          const products = await fetchProductsByCategory(cat);
          return { category: cat, products };
        })
      );

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
    <div className="min-h-screen bg-gray-100 px-4 py-6 my-14">
      <div className="max-w-7xl mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <NavLink to="/">
            <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
              Go Back
            </button>
          </NavLink>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
         
            <NavLink
              to="/add-product"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              + Add Product
            </NavLink>
          </div>
        </div>

        {/* Category-wise Products */}
        {categoryProducts.map(({ category, products }) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
              {category}
            </h3>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <NavLink key={product.id} to={`/product/${product.id}`} className="bg-white rounded-2xl shadow hover:shadow-blue-600/60 transition overflow-hidden flex flex-col cursor-pointer">
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
                        <span className="text-green-600 font-bold">
                          ₹
                          {product.afterdiscountprice ||
                            (product.price * 83).toFixed(0)}
                        </span>
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

                    <div className="flex items-center justify-center my-5">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm w-fit mx-auto">
                        View Product
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

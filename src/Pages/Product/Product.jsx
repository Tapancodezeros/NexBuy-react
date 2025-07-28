// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../api/productService";
import { NavLink } from "react-router-dom";


const Product = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");

  const getLocalProducts = () => {
    return JSON.parse(localStorage.getItem("localProducts")) || [];
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
        const localForCat = localProducts.filter((p) => p.category === group.category);
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
        const localForCat = localProducts.filter((p) => p.category === group.category);
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
    <div className="min-h-screen bg-gray-100 p-4">

      <br /><br /><br/>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 px-2 hover:scale">
        <h2 className="text-3xl font-bold text-center w-full sm:w-auto">Product Categories</h2>
        <NavLink to="/">
          <button className="bg-red-500 text-white px-9 py-2 rounded-md hover:bg-red-600 transition duration-200">
            Go Back
          </button>
        </NavLink>
        <div className="flex gap-3 items-center justify-center">
          <select
            className="p-2 border rounded shadow bg-white"
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add New Product
          </NavLink>
        </div>
      </div>

      {categoryProducts.map(({ category, products }) => (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-semibold mb-3 capitalize ">{category}</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-contain p-3 bg-gray-50"
                />
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-green-600 font-bold">₹{product.price*60}</span>
                      {product.rating && (
                        <span className="text-sm bg-yellow-100 px-2 py-1 rounded text-yellow-800">
                          ⭐ {product.rating.rate}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <NavLink
                      to={`/product/${product.id}`}
                      className="bg-blue-500 text-white px-4 py-1 rounded-2xl hover:bg-blue-600 transition text-sm mx-55"
                    >
                      View Product
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-6">
      
      </div>

 
    </div>
  );
};

export default Product;

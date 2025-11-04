"use client";
import { useEffect, useState } from "react";
import {fetchCategories,fetchAllProducts,deleteProduct,} from "@/app/api/apiService";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlus, FaEdit, FaTrashAlt, FaStar, FaRupeeSign, FaList,FaShoppingCart } from "react-icons/fa";
import { BiCategory } from "react-icons/bi"; // Icon for category select

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to permanently delete this product?")) { 
      try {
        await deleteProduct(id);
        toast.success(
          <div className="flex items-center">
            <FaTrashAlt className="mr-2 text-red-500" /> Product deleted successfully!
          </div>
        );
        // Refresh data after deletion
        setAllProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      } catch (error) {
        console.error(`Failed to delete product with ID ${id}:`, error);
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit-product/${id}`);
  };

  // Groups an array of products by their category
  const groupProductsByCategory = (products) => {
    const grouped = products.reduce((acc, product) => {
      const category = product.category || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});

    return Object.keys(grouped).map(category => ({
      category,
      products: grouped[category],
    }));
  };

  const loadInitialData = async () => {
    try {
      const [cats, products] = await Promise.all([
        fetchCategories(),
        fetchAllProducts(),
      ]);

      const categoryArray = Array.isArray(cats) ? cats : cats?.categories || [];
      const uniqueCategories = Array.from(new Set([...categoryArray, 'other']));
      setCategories(uniqueCategories);
      setAllProducts(products);
      setCategoryProducts(groupProductsByCategory(products));
      setSelectedCat("all");
    } catch (error) {
      console.error("Error loading initial data:", error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCat === "all") {
      setCategoryProducts(groupProductsByCategory(allProducts));
    } else {
      const filtered = allProducts.filter((p) => p.category === selectedCat || (selectedCat === 'other' && !p.category));
      setCategoryProducts([{ category: selectedCat, products: filtered }]);
    }
  }, [allProducts, selectedCat]);

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedCat(selected);

    if (selected === "all") {
      setCategoryProducts(groupProductsByCategory(allProducts));
    } else {
      const productsForCategory = allProducts.filter(
        (p) => p.category === selected || (selected === 'other' && !p.category)
      );
      setCategoryProducts([
        { category: selected, products: productsForCategory },
      ]);
    }
  };

  // --- Product Card Component for cleaner render logic ---
  const ProductCard = ({ product }) => {
    const stock = product.stock ?? 99; // Use product stock if available, otherwise assume 99
    const outofstock = stock <= 0;
    const fewstock = stock > 0 && stock <= 5;
    // Price logic using INR conversion for external API prices
    const price = product.afterdiscountprice
      ? product.afterdiscountprice.toFixed(0)
      : (product.price * 83).toFixed(0);
    const originalPrice = product.afterdiscountprice
      ? product.price.toFixed(0)
      : null;

    return (
      <div
        className="relative bg-white rounded-2xl shadow-xl border  border-gray-100 transition-all duration-300 transform hover:shadow-indigo-300/60 hover:-translate-y-1 overflow-hidden flex flex-col "
      >
        {/* Linkable Content Area */}
        <Link
          href={`/product/${product.id}`}
          className="flex-1 flex flex-col"
        >
          <div className="relative h-56 w-full p-4 bg-gray-50 flex items-center justify-center border-b border-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
            {/* Stock Badges */}
            {outofstock && (
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                Sold Out
              </span>
            )}
            {fewstock && (
              <span className="absolute top-3 right-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                Only {stock} Left!
              </span>
            )}
          </div>
          
          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-extrabold text-xl text-gray-900 line-clamp-2 leading-snug">
                  {product.title}
                </h3>
                {product.rating?.rate ? (
                    <span className="flex items-center text-sm font-semibold bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 whitespace-nowrap ml-2">
                      <FaStar className="mr-1" /> {product.rating.rate}
                    </span>
                  ) : (
                    <span className="text-xs italic text-gray-400 mt-1 whitespace-nowrap">
                      Unrated
                    </span>
                  )}
            </div>
            
            <p className="text-xs text-indigo-600 uppercase tracking-widest font-medium">
              {product.category || 'Miscellaneous'}
            </p>

            {/* Price Block */}
            <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
              {originalPrice ? (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 line-through">
                    <FaRupeeSign className="inline w-3 h-3 mb-0.5" />{originalPrice}
                  </span>
                  <span className="text-xl font-extrabold text-green-600 flex items-center">
                    <FaRupeeSign className="mr-1 w-4 h-4" />{price}
                  </span>
                  <span className="text-sm font-semibold text-indigo-500 mt-0.5">
                    Save {product.discount}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-extrabold text-gray-800 flex items-center">
                  <FaRupeeSign className="mr-1 w-4 h-4" />{price}
                </span>
              )}
            </div>
          </div>
        </Link>
        
        {/* Action Buttons (Local Products Only) */}
        <div className="flex justify-between p-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => handleEdit(product.id)}
            className="flex items-center justify-center flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-sm transition-all shadow-md mr-2"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="flex items-center justify-center flex-1 bg-red-100 hover:bg-red-500 hover:text-white text-red-700 font-medium py-2 rounded-lg text-sm transition-all shadow-md ml-2"
          >
            <FaTrashAlt className="mr-2" /> Delete
          </button>
        </div>
      </div>
    );
  };
  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-8 pb-16 my-15">
      <div className="max-w-7xl mx-auto">
        
        {/* Sticky Header / Toolbar */}
        <div className="sticky top-0 z-10 bg-white rounded-xl shadow-lg p-5 mb-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            
            {/* Navigation & Title */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-all shadow-sm text-sm">
                  <FaArrowLeft className="mr-2" />
                  Go Back
                </button>
              </Link>
              <h1 className="text-2xl font-extrabold text-gray-900 hidden md:block">
                <FaShoppingCart className="inline text-indigo-600 mr-2" /> Product Inventory
              </h1>
            </div>

            {/* Controls: Filter & Add */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              
              {/* Category Filter */}
              <div className="relative flex items-center w-full sm:w-auto">
                <BiCategory className="absolute left-3 text-gray-500 pointer-events-none" />
                <select
                  value={selectedCat}
                  onChange={handleChange}
                  className="min-w-[180px] p-3 pl-9 border border-gray-300 rounded-xl shadow-inner bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 appearance-none transition duration-150"
                >
                  <option value="all">All Categories ({allProducts.length})</option>
                  {Array.isArray(categories) &&
                    categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                </select>
              </div>
              
              {/* Add Product Button */}
              <Link
                href="/add-product"
                className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition-all transform hover:scale-[1.02]"
              >
                <FaPlus className="mr-2" /> Add New Product
              </Link>
            </div>
          </div>
        </div>

        {/* Products by category */}
        {categoryProducts.length === 0 ? (
           <p className="text-center text-xl text-gray-500 py-20">
              No products found in the selected category.
           </p>
        ) : (
          categoryProducts.map(({ category, products }) => (
            <div key={category} className="mb-14">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 capitalize border-b-4 border-indigo-200 inline-block pb-1">
                <FaList className="inline mr-2 text-indigo-600" />
                {category === 'other' ? 'Miscellaneous' : category}
                <span className="ml-3 text-lg font-normal text-gray-500">({products.length} Items)</span>
              </h3>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Product;
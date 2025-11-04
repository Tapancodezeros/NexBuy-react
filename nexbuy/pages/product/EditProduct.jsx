"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { fetchProductById, updateProduct } from "@/app/api/apiService";
import { fetchCategories } from "@/app/api/apiService";
import { FaTag, FaDollarSign, FaPercent, FaInfoCircle, FaImage, FaBoxes, FaArrowLeft, FaRupeeSign } from "react-icons/fa"; // Imported icons for a better look

const EditProduct = () => {
  const params = useParams();
  const router = useRouter();
  const id = params ? params.id : null;
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceInr, setPriceInr] = useState("");

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        const [productData, fetchedCategories] = await Promise.all([
          fetchProductById(id),
          fetchCategories(),
        ]);
        setProduct(productData);
        setCategories(fetchedCategories);
        if (productData && productData.price) {
          setPriceInr((productData.price * 83).toFixed(2)); // Convert USD to INR
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Product not found or failed to load.");
        router.push("/product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id, router]);

  // --- Effect to calculate discounted price ---
  useEffect(() => {
    if (!product) return;

    const price = parseFloat(priceInr); // Use INR price for calculation
    const discount = parseFloat(product.discount);

    if (!isNaN(price) && !isNaN(discount) && discount >= 0 && discount <= 100) {
      const afterDiscount = price - (price * discount) / 100;
      setProduct((prev) => ({
        ...prev,
        afterdiscountprice: afterDiscount.toFixed(2),
      }));
    }
  }, [priceInr, product?.discount]);

  // --- Handle input changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Handle INR price input separately
      setPriceInr(value);
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    try {
      const productData = {
        ...product,
        price: parseFloat(priceInr) / 83, // Convert INR back to USD for API
        discount: parseFloat(product.discount),
        afterdiscountprice: parseFloat(product.afterdiscountprice) / 83, // Convert INR back to USD
        stock: parseInt(product.stock),
      };
      await updateProduct(id, productData);
      toast.success("Product updated successfully!");
      router.push("/product");
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error(error.response?.data?.message || "Failed to update product.");
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-xl font-medium">Loading product details...</p>;
  }

  if (!product) return <p className="text-center py-10 text-xl font-medium text-red-500">Could not load product.</p>;
  // --- Improved Design Structure ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:shadow-3xl border border-gray-100">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center">
            <FaTag className="mr-3 text-indigo-600" />
            Edit Product
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Update the details for product ID: **{product.id}**
          </p>
        </div>
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Input Field: Title */}
          <InputField
            type="text" name="title" label="Product Title" icon={<FaInfoCircle />}
            value={product.title} onChange={handleChange} required
          />
          
          {/* Price & Discount Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Input Field: Price */}
            <InputField
              type="number" name="price" label="Original Price (INR)" icon={<FaRupeeSign />}
              value={priceInr} onChange={handleChange} required min="0.01" step="0.01"
            />
            
            {/* Input Field: Discount */}
            <InputField
              type="number" name="discount" label="Discount (%)" icon={<FaPercent />}
              value={product.discount || ''} onChange={handleChange} min="0" max="100"
            />
            
            {/* Input Field: Discounted Price (Read-Only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaDollarSign className="mr-1" /> Discounted Price
              </label>
              <input
                type="text"
                name="afterdiscountprice"
                value={`₹${product.afterdiscountprice || '0.00'}`}
                readOnly
                placeholder="Discounted Price"
                className="w-full p-3 border border-gray-300 rounded-lg bg-indigo-50 text-indigo-800 font-bold focus:outline-none"
              />
            </div>
          </div>

          {/* Textarea Field: Description */}
          <TextareaField
            name="description" label="Product Description" icon={<FaInfoCircle />}
            value={product.description} onChange={handleChange} required
          />
          
          {/* Input Field: Image URL */}
          <InputField
            type="text" name="image" label="Image URL" icon={<FaImage />}
            value={product.image} onChange={handleChange} required
          />

          {/* Category & Stock Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Select Field: Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaTag className="mr-1" /> Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 appearance-none"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Field: Stock */}
            <InputField
              type="number" name="stock" label="Stock Quantity" icon={<FaBoxes />}
              value={product.stock || ''} onChange={handleChange} required min="0"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-[1.01]"
          >
            Update Product Details
          </button>
        </form>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <Link href="/product" passHref>
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
              <FaArrowLeft className="mr-2" />
              Go back to Product List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Input Component for a Cleaner Form ---
const InputField = ({ label, name, value, onChange, icon, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 flex items-center mb-1">
      {icon} <span className="ml-1">{label}</span>
    </label>
    <input
      id={name} name={name} value={value} onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
      {...props}
    />
  </div>
);

// --- Reusable Textarea Component ---
const TextareaField = ({ label, name, value, onChange, icon, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 flex items-center mb-1">
      {icon} <span className="ml-1">{label}</span>
    </label>
    <textarea
      id={name} name={name} value={value} onChange={onChange} rows="3"
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
      {...props}
    />
  </div>
);

export default EditProduct;
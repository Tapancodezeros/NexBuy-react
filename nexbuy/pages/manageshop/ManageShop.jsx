"use client"; 
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {listShopsByUser,createShop,updateShop,deleteShop} from "@/app/api/apiService";
import { FaStore, FaPlus, FaSave, FaArrowLeft, FaEdit, FaTrashAlt, FaTag, FaFileAlt, FaEye } from "react-icons/fa";

const ManageShop = () => {
  const [shop, setShop] = useState({ name: "", description: "" });
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [allShops, setAllShops] = useState([]);
  const [editingShopId, setEditingShopId] = useState(null);
  
  const router = useRouter(); 

  useEffect(() => {
    const userString = localStorage.getItem("userId");
    let actualUserId = null;

    if (userString) {
      try {
        const parsedValue = JSON.parse(userString);
        
        if (parsedValue && parsedValue._id) {
          actualUserId = parsedValue._id;
        } 
        else if (typeof parsedValue === 'string' || typeof parsedValue === 'number') {
          actualUserId = String(parsedValue); 
        }
      } catch (e) {
        actualUserId = userString;
      }
    }

    if (actualUserId) {
      setUserId(actualUserId);
    } else {
      toast.error("Please log in to manage your shops.");
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (userId) {
      fetchShops();
    }
  }, [userId]);

  const fetchShops = async () => {
    try {
      const shopsFromServer = await listShopsByUser(userId);
      setAllShops(shopsFromServer);
      const shopIds = shopsFromServer.map((shop) => shop.id);
      localStorage.setItem("userShopIds", JSON.stringify(shopIds));
    } catch (error) {
      console.error("Could not fetch shops:", error);
    }
  };

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let valid = true;
    let tempErrors = { name: "", description: "" };

    if (!shop.name.trim()) {
      tempErrors.name = "Shop name is required.";
      valid = false;
    }

    if (!shop.description.trim()) {
      tempErrors.description = "Shop description is required.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;
    if (!userId) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      const currentEditingShopId = editingShopId; 
      
      if (currentEditingShopId) {
        await updateShop(currentEditingShopId, shop);
        toast.success("Shop updated successfully!");
      } else {
        await createShop(userId, shop);
        toast.success("Shop added successfully!");
      }
      
      // Clear form and state
      setShop({ name: "", description: "" });
      setEditingShopId(null);
      setErrors({ name: "", description: "" });
      await fetchShops();

    } catch (error) {
      toast.error("An error occurred while saving the shop.");
    }
  };

  const handleDelete = async (shopId) => {
    if (!confirm("Are you sure you want to delete this shop? This action cannot be undone.")) return;

    try {
      await deleteShop(shopId);
      toast.info(
        <div className="flex items-center">
            <FaTrashAlt className="mr-2 text-red-500" /> Shop deleted successfully!
        </div>, 
        { autoClose: 1500 }
    );
      await fetchShops();
      if (editingShopId === shopId) {
        setShop({ name: "", description: "" });
        setEditingShopId(null);
      }
    } catch (error) {
      toast.error("Failed to delete shop.");
    }
  };

  const handleEdit = (shopToEdit) => {
    setShop({ name: shopToEdit.name, description: shopToEdit.description });
    // Note: API requires _id for edit/delete operations typically
    setEditingShopId(shopToEdit.id); 
    toast.info(`Editing shop: ${shopToEdit.name}`);
  };

  const handleViewProducts = (shopId) => {
    localStorage.setItem("selectedShopId", shopId);
    router.push("/product");
  };
  // Show a loading/placeholder message until userId is confirmed
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600 animate-pulse">
            <FaStore className="inline mr-2 text-indigo-500" /> Loading user data and authentication...
        </p>
      </div>
    );
  }
  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      
        {/* Header */}
        <h2 className="text-5xl font-extrabold text-center text-gray-900 tracking-tight mb-12 my-20">
          <FaStore className="inline mr-3 text-indigo-600" />
          Manage Your Shops
        </h2>

        {/* Shop Form Card */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 transition-all duration-300 transform hover:shadow-indigo-300/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            {editingShopId !== null ? "🔄 Edit Shop Details" : "✚ Create New Shop"}
          </h3>
            
          <div className="space-y-6">
            {/* Shop Name Input */}
            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
                <FaTag className="mr-2 text-indigo-500" /> Shop Name
              </label>
              <input
                name="name"
                placeholder="Enter a unique shop name"
                value={shop.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.name ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-500"
                } focus:outline-none focus:ring-2 transition duration-200 shadow-sm`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Shop Description Input */}
            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
                <FaFileAlt className="mr-2 text-indigo-500" /> Shop Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your shop and what you sell"
                value={shop.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.description ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-indigo-500"
                } focus:outline-none focus:ring-2 transition duration-200 shadow-sm resize-none`}
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-md transform hover:scale-[1.01] w-full sm:w-auto"
              >
                {editingShopId !== null ? (
                    <> <FaSave className="mr-2" /> Update Shop </>
                ) : (
                    <> <FaPlus className="mr-2" /> Add Shop </>
                )}
              </button>

              <Link href="/">
                <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-md">
                  <FaArrowLeft className="mr-2" /> Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Existing Shops List */}
        {allShops.length > 0 && (
          <div className="mt-12 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
              🛍️ Your Active Shops
            </h3>
            <div className="space-y-4">
            {allShops.map((s) => (
              <div
                key={s.id} 
                className={`border-2 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center transition duration-300 ${
                    s._id === editingShopId ? 'border-indigo-400 bg-indigo-50 shadow-lg' : 'border-gray-100 hover:shadow-md hover:border-indigo-200 bg-white'
                }`}
              >
                <div className="mb-3 md:mb-0 max-w-lg">
                  <p className="text-xl font-extrabold text-gray-800 flex items-center">
                    <FaStore className="mr-2 text-indigo-600" /> {s.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 pl-6 italic">
                    {s.description}
                  </p>
                </div>
                <div className="flex gap-3 text-right">
                  <button
                    onClick={() => handleViewProducts(s.id)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    <FaEye className="mr-1" /> View Products
                  </button>
                  <button
                    onClick={() => handleEdit(s)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)} // Use _id for deletion
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageShop;

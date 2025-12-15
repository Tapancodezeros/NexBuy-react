import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const ManageShop = () => {
  const [shop, setShop] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [allShops, setAllShops] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shops");
    if (saved) {
      setAllShops(JSON.parse(saved));
    }
  }, []);

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
    } else if (shop.name.trim().length < 2) {
      tempErrors.name = "Shop name must be at least 2 characters.";
      valid = false;
    }

    if (!shop.description.trim()) {
      tempErrors.description = "Shop description is required.";
      valid = false;
    } else if (shop.description.trim().length < 10) {
      tempErrors.description = "Description must be at least 10 characters.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      if (editIndex === null && allShops.length >= 6) {
        toast.error("You can only add up to 6 shops.", { autoClose: 2000 });
        return;
      }

      const updatedShops = [...allShops];
      if (editIndex !== null) {
        updatedShops[editIndex] = shop;
        toast.success("🏪 Shop updated successfully!", { autoClose: 1500 });
      } else {
        updatedShops.push(shop);
        toast.success("🏪 Shop added successfully!", { autoClose: 1500 });
      }

      localStorage.setItem("shops", JSON.stringify(updatedShops));
      setAllShops(updatedShops);
      setShop({ name: "", description: "" });
      setEditIndex(null);
      setErrors({ name: "", description: "" });

      // Simulate loading delay for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      toast.error("❌ Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;

    const updatedShops = [...allShops];
    updatedShops.splice(index, 1);
    localStorage.setItem("shops", JSON.stringify(updatedShops));
    setAllShops(updatedShops);
    toast.info("🗑️ Shop deleted!", { autoClose: 1500 });

    if (editIndex === index) {
      setShop({ name: "", description: "" });
      setEditIndex(null);
    }
  };

  const handleEdit = (index) => {
    setShop(allShops[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShop({ name: "", description: "" });
    setEditIndex(null);
    setErrors({ name: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            🏬 Manage Your Shops
          </h1>
          <p className="text-gray-600 text-lg">
            Create and manage your business locations with ease
          </p>
        </div>

        {/* Shop Form Card */}
        <div className="card card-hover animate-slide-up mb-8">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {editIndex !== null ? "Edit Shop" : "Add New Shop"}
                </h2>
                <p className="text-gray-600">
                  {editIndex !== null ? "Update your shop information" : "Create a new shop location"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Shop Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Shop Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter shop name"
                    value={shop.name}
                    onChange={handleChange}
                    className={`form-input pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Shop Description Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Shop Description *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                    </svg>
                  </div>
                  <textarea
                    name="description"
                    placeholder="Describe your shop..."
                    value={shop.description}
                    onChange={handleChange}
                    rows="4"
                    className={`form-textarea pl-10 resize-none ${errors.description ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  />
                </div>
                {errors.description && (
                  <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Limit Warning */}
            {editIndex === null && allShops.length >= 6 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">
                    You can only add up to 6 shops maximum.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={isLoading || (editIndex === null && allShops.length >= 6)}
                className={`btn-primary flex-1 sm:flex-none ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner mr-2"></div>
                    {editIndex !== null ? 'Updating...' : 'Adding...'}
                  </div>
                ) : (
                  <>
                    {editIndex !== null ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Update Shop
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Shop
                      </>
                    )}
                  </>
                )}
              </button>

              {editIndex !== null && (
                <button
                  onClick={handleCancel}
                  className="btn-secondary flex-1 sm:flex-none"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              )}

              <NavLink to="/" className="flex-1 sm:flex-none">
                <button className="btn-danger w-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Shops List */}
        {allShops.length > 0 && (
          <div className="card">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Your Shops</h3>
                  <p className="text-gray-600">{allShops.length} shop{allShops.length !== 1 ? 's' : ''} registered</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allShops.map((s, idx) => (
                  <div
                    key={idx}
                    className="group bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            🏷️ {s.name}
                          </h4>
                          <p className="text-sm text-gray-500">Shop #{idx + 1}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors"
                          title="Edit shop"
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors"
                          title="Delete shop"
                        >
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      📃 {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {allShops.length === 0 && (
          <div className="card text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No shops yet</h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first shop location
              </p>
              <div className="text-sm text-gray-500">
                💡 Tip: You can add up to 6 shops to manage
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageShop;

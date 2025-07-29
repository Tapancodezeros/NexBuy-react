import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ManageShop = () => {
  const [shop, setShop] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [savedShop, setSavedShop] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("shop");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedShop(parsed);
    }
  }, []);

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMsg("");
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

  const handleSave = () => {
    if (!validate()) return;

    localStorage.setItem("shop", JSON.stringify(shop));
    setSavedShop(shop);
    setSuccessMsg("✅ Shop details saved successfully!");

    // Reset form after save
    setShop({ name: "", description: "" });
    setErrors({ name: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 my-17">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Manage Your Shop
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Shop Name</label>
            <input
              name="name"
              placeholder="Enter shop name"
              value={shop.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Shop Description</label>
            <textarea
              name="description"
              placeholder="Describe your shop"
              value={shop.description}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {successMsg && (
            <div className="text-green-600 font-medium bg-green-100 p-3 rounded">
              {successMsg}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Save Shop
            </button>

          <NavLink to="/">
            <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
              Go Back
            </button>
          </NavLink>
          </div>
        </div>

        {savedShop && (
          <div className="mt-10 bg-white p-6 rounded-xl shadow space-y-2">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">📋 Your Shop Details</h3>
            <p><span className="font-medium text-gray-700">Name:</span> {savedShop.name}</p>
            <p><span className="font-medium text-gray-700">Description:</span> {savedShop.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageShop;

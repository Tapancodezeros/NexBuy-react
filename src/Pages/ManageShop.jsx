import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const ManageShop = () => {
  const [shop, setShop] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [allShops, setAllShops] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

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

    if (editIndex === null && allShops.length >= 6) {
      toast.error("You can only add up to 6 shops.", { autoClose: 2000 });
      return;
    }

    if (editIndex !== null) {
      const updatedShops = [...allShops];
      updatedShops[editIndex] = shop;
      localStorage.setItem("shops", JSON.stringify(updatedShops));
      setAllShops(updatedShops);
      toast.success("Shop updated successfully!", { autoClose: 1500 });
    } else {
      const updatedShops = [...allShops, shop];
      localStorage.setItem("shops", JSON.stringify(updatedShops));
      setAllShops(updatedShops);
      toast.success("Shop added successfully!", { autoClose: 1500 });
    }

    setShop({ name: "", description: "" });
    setEditIndex(null);
    setErrors({ name: "", description: "" });
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this shop?");
    if (!confirmDelete) return;

    const updatedShops = [...allShops];
    updatedShops.splice(index, 1);
    localStorage.setItem("shops", JSON.stringify(updatedShops));
    setAllShops(updatedShops);
    toast.info("❌ Shop deleted successfully!", { autoClose: 1500 });

    if (editIndex === index) {
      setShop({ name: "", description: "" });
      setEditIndex(null);
    }
  };

  const handleEdit = (index) => {
    setShop(allShops[index]);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 my-17">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Manage Your Shops
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

          {editIndex === null && allShops.length >= 6 && (
            <p className="text-red-600 font-medium text-sm">
              ❌ You have reached the maximum limit of 6 shops.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={editIndex === null && allShops.length >= 6}
              className={`${
                editIndex === null && allShops.length >= 6
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-5 py-2 rounded-lg transition w-full sm:w-auto`}
            >
              {editIndex !== null ? "🔄 Update Shop" : "✚ Add Shop"}
            </button>

            <NavLink to="/">
              <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
                ⬅️ Go Back
              </button>
            </NavLink>
          </div>
        </div>

        {allShops.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">🛒 Your Shops</h3>
            {allShops.map((s, idx) => (
              <div
                key={idx}
                className="border-b border-gray-200 pb-3 flex justify-between items-start gap-2"
              >
                <div>
                  <p>
                    <span className="font-medium text-gray-700">Name:</span> {s.name}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Description:</span> {s.description}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end text-m font-semibold">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageShop;

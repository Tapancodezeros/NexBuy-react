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

    const updatedShops = [...allShops];
    if (editIndex !== null) {
      updatedShops[editIndex] = shop;
      toast.success("Shop updated!", { autoClose: 1500 });
    } else {
      updatedShops.push(shop);
      toast.success("Shop added!", { autoClose: 1500 });
    }

    localStorage.setItem("shops", JSON.stringify(updatedShops));
    setAllShops(updatedShops);
    setShop({ name: "", description: "" });
    setEditIndex(null);
    setErrors({ name: "", description: "" });
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;

    const updatedShops = [...allShops];
    updatedShops.splice(index, 1);
    localStorage.setItem("shops", JSON.stringify(updatedShops));
    setAllShops(updatedShops);
    toast.info("❌ Shop deleted!", { autoClose: 1500 });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-white py-12 px-4 sm:px-6 lg:px-8 my-18">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 my-15">
          🏬 Manage Your Shops
        </h2>

        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Shop Name</label>
            <input
              name="name"
              placeholder="Enter shop name"
              value={shop.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Shop Description</label>
            <textarea
              name="description"
              placeholder="Describe your shop"
              value={shop.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {editIndex === null && allShops.length >= 6 && (
            <p className="text-red-600 font-semibold text-sm">
              ❌ You can only add 6 shops max.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={editIndex === null && allShops.length >= 6}
              className={`${
                editIndex === null && allShops.length >= 6
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 w-full sm:w-auto`}
            >
              {editIndex !== null ? "🔄 Update Shop" : "✚ Add Shop"}
            </button>

            <NavLink to="/">
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-all duration-200">
                ⬅️ Go Back
              </button>
            </NavLink>
          </div>
        </div>

        {allShops.length > 0 && (
          <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg space-y-6 ">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🛍️ Your Shops</h3>
            {allShops.map((s, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-start hover:shadow-md transition"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    🏷️ {s.name}
                  </p>
                  <p className="text-gray-600 mt-1">
                    📃 {s.description}
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-600 hover:text-red-800 font-medium"
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

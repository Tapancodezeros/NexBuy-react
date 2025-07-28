import React, { useState, useEffect } from "react";


const ManageShop = () => {
  const [shop, setShop] = useState({ name: "", description: "" });

  useEffect(() => {
    const saved = localStorage.getItem("shop");
    if (saved) {
      setShop(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("shop", JSON.stringify(shop));
    alert("Shop saved successfully");
  };

  return (
    <div className="flex">
      
      <div className="flex-1 p-6">
        <br/><br/><br/><br/>
        <h2 className="text-2xl font-bold mb-4">Manage Your Shop</h2>
        <div className="space-y-4 bg-white p-6 rounded shadow max-w-xl">
          <input
            name="name"
            placeholder="Shop Name"
            value={shop.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Shop Description"
            value={shop.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageShop;

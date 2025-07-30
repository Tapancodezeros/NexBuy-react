import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { NavLink } from "react-router-dom";

// Define a simple color palette for pie slices
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const Performance = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const data = products.map((p, index) => ({
    name: p.title.length > 20 ? p.title.slice(0, 15) + "..." : p.title,
    rating: p.rating.rate,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 my-15">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Product Performance Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Product Ratings (Line Chart)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#3b82f6" // Blue-500
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Ratings Distribution (Pie Chart)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="rating"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      <div className="flex items-center justify-center my-15">
        <NavLink to="/">
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition ">
            Go Back
          </button>
        </NavLink>
      </div>
    </div>
    </div>
  );
};

export default Performance;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { NavLink } from "react-router-dom";

// Color palette for charts
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const Performance = () => {
  const [products, setProducts] = useState([]);
  const [categoryAvgRatings, setCategoryAvgRatings] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const fetchedProducts = res.data;
        setProducts(fetchedProducts);

        // Calculate category-wise average ratings
        const categoryMap = {};
        fetchedProducts.forEach((product) => {
          const { category, rating } = product;

          if (!categoryMap[category]) {
            categoryMap[category] = { total: 0, count: 0 };
          }

          categoryMap[category].total += rating.rate;
          categoryMap[category].count += 1;
        });

        const avgRatings = Object.entries(categoryMap).map(
          ([category, { total, count }]) => ({
            category,
            avgRating: parseFloat((total / count).toFixed(2)),
          })
        );

        setCategoryAvgRatings(avgRatings);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const data = products.map((p, index) => ({
    name: p.title.length > 20 ? p.title.slice(0, 10) + "..." : p.title,
    rating: p.rating.rate,
    color: COLORS[index % COLORS.length],
  }));

  const data1 = products.map((p, index) => ({
    name: p.title.length > 20 ? p.title.slice(0, 10) + "..." : p.title,
    count: p.rating.count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 my-15">
      <div className="max-w-7xl mx-auto">
        {/* Go Back Button */}
        <div className="mb-6">
          <NavLink to="/">
            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm transition duration-200">
              ⬅️ Go Back
            </button>
          </NavLink>
        </div>

        {/* Header */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          📊 Product Performance Dashboard
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 min-h-[450px]">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Product Ratings (Line Chart)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#8884d8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 min-h-[450px]">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Product-wise Ratings & Count (Pie Chart)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  dataKey="count"
                  nameKey="name"
                  data={data1}
                  cx="30%"
                  cy="30%"
                  innerRadius={40}
                  outerRadius={80}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-count-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Pie
                  dataKey="rating"
                  data={data}
                  cx="70%"
                  cy="70%"
                  innerRadius={40}
                  outerRadius={70}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-rating-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Average Rating by Category (Bar Chart)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={categoryAvgRatings}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="category" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="avgRating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;

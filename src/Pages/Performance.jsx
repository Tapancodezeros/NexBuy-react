import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Area,
  AreaChart,
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
  CartesianGrid,
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

  // Product-wise data for charts
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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center my-15">
          Product Performance Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart: Product Ratings */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Product Ratings (Line Chart)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#8884d8"
                  strokeWidth={4}
                  fill="#66CDAA"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart: Product Ratings & Count */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Product-wise Ratings & Count (Pie Chart)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="count"
                  nameKey="name"
                  data={data1}
                  cx="30%"
                  cy="30%"
                  innerRadius={40}
                  outerRadius={90}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-count-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Pie
                  dataKey="rating"
                  data={data}
                  cx="68%"
                  cy="65%"
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

          {/* Bar Chart: Category-wise Avg Ratings */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Average Rating by Category (Bar Chart)
            </h3>
            <ResponsiveContainer width="80%" height={300}>
              <BarChart
                data={categoryAvgRatings}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                
                <XAxis dataKey="category" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="avgRating" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Go Back Button */}
        <div className="flex items-center justify-center my-8">
          <NavLink to="/">
            <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
              ⬅️ Go Back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Performance;

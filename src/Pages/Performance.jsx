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
    name: p.title.length > 20 ? p.title.slice(0, 10) + "..." : p.title,
    rating: p.rating.rate,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 my-15">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Product Performance Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Line Chart */}
          {/* <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Product Ratings (Line Chart)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
               <LineChart data={data}> 
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
               
                <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={4} fill="66CDAA"/>
              </LineChart>
            </ResponsiveContainer>
          </div> */}

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Display product-wise Ratings  (Pie Chart)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                  <Pie dataKey="rating" nameKey="name" data={data} cx="50%" cy="50%" innerRadius={100} outerRadius={150} fill="#82ca9d" label>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <ResponsiveContainer>
             <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
         >
          <XAxis dataKey="name" />
           <YAxis domain={[0, 5]} />
          <Tooltip />
          <Area type="monotone" dataKey="rating" stroke="#82ca9d" fill="#CC6688" />
            </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      <div className="flex items-center justify-center my-5">
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

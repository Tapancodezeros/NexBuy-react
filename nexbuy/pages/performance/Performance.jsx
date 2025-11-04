import React, { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, CartesianGrid,
} from "recharts";
import Link from "next/link";
import { fetchAllProducts } from "@/app/api/apiService";
import { FaArrowLeft, FaChartLine, FaChartPie, FaChartBar, FaTachometerAlt } from "react-icons/fa";

// Customized Color palette matching the app's aesthetic
const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#ec4899", "#06b6d4", "#e879f9"];

// --- Helper Function to Render Percentage inside Pie Slices ---
const renderLabelWithPercentage = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    // Only render the label if the slice is large enough to prevent overlap
    if (percent * 100 > 5) {
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10} fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }
    return null;
  };

const Performance = () => {
  const [products, setProducts] = useState([]);
  const [categoryAvgRatings, setCategoryAvgRatings] = useState([]);

  // --- Data Fetching and Processing ---
  useEffect(() => {
    const getProducts = async () => {
      try {
        // Fetch API products (using fetchAllProducts)
        const fetchedProducts = await fetchAllProducts();
        
        // Combine with local products (IDs > 20 are local mock data)
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];
        const combinedProducts = [...fetchedProducts, ...localProducts];
        
        setProducts(combinedProducts);

        // Calculate Average Ratings by Category (for Bar Chart)
        const categoryMap = {};
        combinedProducts.forEach((product) => {
          // Use 'misc' for uncategorized or local items lacking a string category
          const category = product.category || 'misc'; 
          const rating = product.rating?.rate; // Use optional chaining
          
          // Safety check: only process products with a valid numeric rating
          if (typeof rating === 'number') { 
            if (!categoryMap[category]) {
              categoryMap[category] = { total: 0, count: 0 };
            }
            categoryMap[category].total += rating;
            categoryMap[category].count += 1;
          }
        });
        
        const avgRatings = Object.entries(categoryMap).map(
          ([category, { total, count }]) => ({
            category: category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            avgRating: parseFloat((total / count).toFixed(2)),
          })
        ).sort((a, b) => b.avgRating - a.avgRating); // Sort for better Bar Chart visualization

        setCategoryAvgRatings(avgRatings);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, []);

  // --- Data Preparation for Recharts ---
  
  const ratedProducts = products.filter(p => p.rating && typeof p.rating.rate === 'number');
  // Line Chart Data (Top 10 products by rating)
  const lineChartData = ratedProducts
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 10)
    .map((p) => ({
      name: p.title.length > 20 ? p.title.slice(0, 15) + "..." : p.title,
      rating: p.rating.rate,
    }));
  // Pie Chart Data (Top 8 categories by total review count)
  const pieChartData = categoryAvgRatings
    .map(item => ({ 
        name: item.category, 
        value: products
                .filter(p => p.category === item.category.toLowerCase() || (item.category === 'Misc' && !p.category))
                .reduce((sum, p) => sum + (p.rating?.count || 0), 0)
    }))
    .filter(item => item.value > 0) // Only include categories with reviews
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 my-15">
      <div className="max-w-7xl mx-auto">

        {/* Header and Navigation */}
        <div className="flex justify-between items-center mb-10 pb-5 border-b border-indigo-100">
          <Link href="/">
            <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-all shadow-sm text-sm">
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </Link>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <FaTachometerAlt className="mr-3 text-indigo-600" />
            Product Analytics Dashboard
          </h2>
          <div className="w-20"> {/* Spacer */}</div>
        </div>
        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
          {/* Chart 1: Average Rating by Category (Bar Chart) - Full Width */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-indigo-500/30 lg:col-span-3 border border-gray-100 min-h-[500px]">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
              <FaChartBar className="mr-3 text-indigo-500" />
              Category Performance (Average Rating)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={categoryAvgRatings}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="category" angle={-15} textAnchor="end" height={60} interval={0} />
                <YAxis domain={[0, 5]} label={{ value: 'Rating (0-5)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                    formatter={(value) => [`${value} / 5`, 'Avg Rating']} 
                    labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar dataKey="avgRating" fill={COLORS[0]} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Chart 2: Product Ratings (Line Chart) - Half Width */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-indigo-500/30 lg:col-span-2 border border-gray-100 min-h-[450px]">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
              <FaChartLine className="mr-3 text-green-500" />
              Top 10 Products by Rating
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" angle={-10} textAnchor="end" interval={0} height={50} />
                <YAxis domain={[0, 5]} label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                    formatter={(value) => [`${value} / 5`, 'Rating']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke={COLORS[1]} // Green accent
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Chart 3: Review Count Distribution (Pie Chart) - Quarter Width */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-indigo-500/30 lg:col-span-1 border border-gray-100 min-h-[450px] flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
                <FaChartPie className="mr-3 text-fuchsia-500" />
                Category Review Distribution
                </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  nameKey="name"
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  label={renderLabelWithPercentage} // ADDED: Custom label for percentages
                  labelLine={false} // ADDED: Hide lines since labels are internal
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    formatter={(value) => [`${value} Reviews`, 'Total Count']} 
                    labelFormatter={(label) => `Category: ${label}`}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                />
                <Legend 
                    layout="vertical" 
                    verticalAlign="bottom" 
                    align="center" 
                    wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Performance;

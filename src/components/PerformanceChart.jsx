import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
// Dummy performance data
const data = [
  { month: "Jan", sales: 550 },
  { month: "Feb", sales: 1000 },
  { month: "Mar", sales: 200 },
  { month: "Apr", sales: 800 },
  { month: "May", sales: 700 },
  { month: "Jun", sales: 1350 },
  { month:"July", sales: 1700},
];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  export const  MyPieChart = () => {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="sales"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
export const PerformanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

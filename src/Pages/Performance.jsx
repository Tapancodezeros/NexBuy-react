import React from "react";

import { PerformanceChart } from "../components/PerformanceChart";
import { MyPieChart } from "../components/PerformanceChart";
const Performance = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Shop Performance</h2>
        <div className="bg-white p-6 rounded shadow">
          <PerformanceChart />
          <MyPieChart/>
        </div>
      </div>
    </div>
  );
};

export default Performance;

    import React, { useState, useEffect } from 'react';
    import axios from 'axios'; // Or use fetch
import { PieChart,Pie, ResponsiveContainer, Tooltip } from 'recharts';


export function Rating() {
      const [chartData, setChartData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://fakestoreapi.com/products'); // Replace with your API
        
            // Transform data as needed for your charting library
            const formattedData = response.data.map(data => {
            return ({
        label: data.category, // Example: 'category' from API
        value: data.rating.rate,
    });
});
setChartData(formattedData);
            console.log("🚀 ~ fetchData ~ formattedData:", formattedData)
        
    return(
    <ResponsiveContainer>
    <PieChart>
      <Pie
        data={formattedData}
        datasetIdKey='rating'
        namekey='label'
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
    <Tooltip/>
    </PieChart>
    </ResponsiveContainer>
  )
}
              
            catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
      

        fetchData();
      }, []); // Empty dependency array means it runs once on mount

    
 }


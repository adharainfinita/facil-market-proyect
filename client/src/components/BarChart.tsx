import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const BarChart: React.FC = () => {
  const dataComplete = useSelector((state:RootState) => state.admin.analyticsData);

  console.log(dataComplete.allUsers);
  console.log("info:" ,dataComplete.productsInfo);
 const dates = dataComplete.productsInfo.map(match => match.createdAt)

  const dates2 = dates.map(match => match.dateObject.day);

  
  
 

 //
  

  Chart.register(CategoryScale, LinearScale, BarController, BarElement);
  const [chartData, setChartData] = useState({
    labels: dates2,
    datasets: [
      {
        label: 'New users',
        data: dataComplete.allUsers.map(match => match.LevelOfActivity),
        backgroundColor: 'rgba(100, 200, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div>
      <h2>Activity of users</h2>
      <Bar data={chartData}  />
    </div>
  );
};

export default BarChart;

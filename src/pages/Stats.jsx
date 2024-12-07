import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const StatsBar = () => {
  // Mock data for the chart
  const mockData = [
    { category: 'Work', hours: 40, month: 12, day: 2, year: 2024 },
    { category: 'Exercise', hours: 5, month: 12, day: 3, year: 2024 },
    { category: 'Leisure', hours: 20, month: 12, day: 2, year: 2024 },
    { category: 'Learning', hours: 10, month: 12, day: 2, year: 2024 },
  ];

  // Prepare data for the chart
  const categories = [...new Set(mockData.map(item => item.category))]; // Unique activity categories
  const labels = mockData.map(item => `${item.month}/${item.day}/${item.year}`);
  
  // Organize the data by date and activity category
  const dataByDate = labels.map(date => {
    return categories.map(category => {
      const activity = mockData.find(item => `${item.month}/${item.day}/${item.year}` === date && item.category === category);
      return activity ? activity.hours : 0; // Default to 0 if no activity for that date/category
    });
  });

  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const chartData = {
    labels: labels, // Dates as labels
    datasets: categories.map((category, index) => ({
      label: category,
      data: dataByDate.map(data => data[index]),
      backgroundColor: backgroundColors[index % backgroundColors.length],
      borderColor: backgroundColors[index % backgroundColors.length].replace('0.2', '1'),
      borderWidth: 1,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Activities Breakdown by Date',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Hours',
        },
        beginAtZero: true,
        stacked: true, // Enable stacking
      },
    },
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Activity Stats</h1>

      {/* Bar Chart */}
      <div className="d-flex justify-content-center">
        <div style={{ width: '70%' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

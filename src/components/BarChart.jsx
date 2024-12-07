import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const BarChart = () => {
  // Mock data for the chart
  const mockData = [
        { category: 'Work', hours: 8, month: 12, day: 1, year: 2024 },
        { category: 'Exercise', hours: 1, month: 12, day: 1, year: 2024 },
        { category: 'Leisure', hours: 3, month: 12, day: 1, year: 2024 },
        { category: 'Learning', hours: 2, month: 12, day: 1, year: 2024 },
        
        { category: 'Work', hours: 7, month: 12, day: 2, year: 2024 },
        { category: 'Exercise', hours: 2, month: 12, day: 2, year: 2024 },
        { category: 'Leisure', hours: 2, month: 12, day: 2, year: 2024 },
        { category: 'Learning', hours: 3, month: 12, day: 2, year: 2024 },
        
        { category: 'Work', hours: 9, month: 12, day: 3, year: 2024 },
        { category: 'Exercise', hours: 1, month: 12, day: 3, year: 2024 },
        { category: 'Leisure', hours: 2, month: 12, day: 3, year: 2024 },
        { category: 'Learning', hours: 2, month: 12, day: 3, year: 2024 },
      
        { category: 'Work', hours: 8, month: 12, day: 4, year: 2024 },
        { category: 'Exercise', hours: 3, month: 12, day: 4, year: 2024 },
        { category: 'Leisure', hours: 1, month: 12, day: 4, year: 2024 },
        { category: 'Learning', hours: 2, month: 12, day: 4, year: 2024 },
        
        { category: 'Work', hours: 7, month: 12, day: 5, year: 2024 },
        { category: 'Exercise', hours: 2, month: 12, day: 5, year: 2024 },
        { category: 'Leisure', hours: 2, month: 12, day: 5, year: 2024 },
        { category: 'Learning', hours: 3, month: 12, day: 5, year: 2024 },
      
        { category: 'Work', hours: 8, month: 12, day: 6, year: 2024 },
        { category: 'Exercise', hours: 2, month: 12, day: 6, year: 2024 },
        { category: 'Leisure', hours: 3, month: 12, day: 6, year: 2024 },
        { category: 'Learning', hours: 2, month: 12, day: 6, year: 2024 },
        
        { category: 'Work', hours: 7, month: 12, day: 7, year: 2024 },
        { category: 'Exercise', hours: 1, month: 12, day: 7, year: 2024 },
        { category: 'Leisure', hours: 2, month: 12, day: 7, year: 2024 },
        { category: 'Learning', hours: 3, month: 12, day: 7, year: 2024 },
      
        { category: 'Work', hours: 9, month: 12, day: 8, year: 2024 },
        { category: 'Exercise', hours: 1, month: 12, day: 8, year: 2024 },
        { category: 'Leisure', hours: 3, month: 12, day: 8, year: 2024 },
        { category: 'Learning', hours: 2, month: 12, day: 8, year: 2024 },
      
        { category: 'Work', hours: 8, month: 12, day: 9, year: 2024 },
        { category: 'Exercise', hours: 2, month: 12, day: 9, year: 2024 },
        { category: 'Leisure', hours: 2, month: 12, day: 9, year: 2024 },
        { category: 'Learning', hours: 3, month: 12, day: 9, year: 2024 },
        
        { category: 'Work', hours: 9, month: 12, day: 10, year: 2024 },
        { category: 'Exercise', hours: 1, month: 12, day: 10, year: 2024 },
        { category: 'Leisure', hours: 3, month: 12, day: 10, year: 2024 },
        { category: 'Learning', hours: 2, month: 12, day: 10, year: 2024 },
      
        { category: 'Work', hours: 8, month: 12, day: 11, year: 2024 },
        { category: 'Exercise', hours: 2, month: 12, day: 11, year: 2024 },
        { category: 'Leisure', hours: 1, month: 12, day: 11, year: 2024 },
        { category: 'Learning', hours: 3, month: 12, day: 11, year: 2024 },
      
        { category: 'Work', hours: 7, month: 12, day: 12, year: 2024 },
        { category: 'Exercise', hours: 2, month: 12, day: 12, year: 2024 },
        { category: 'Leisure', hours: 3, month: 12, day: 12, year: 2024 },
        { category: 'Learning', hours: 2, month: 12, day: 12, year: 2024 },
      
  ];

  // Prepare data for the chart
  const categories = [...new Set(mockData.map(item => item.category))]; // Unique activity categories
  
  // Create a unique set of dates (MM/DD/YYYY format)
  const labels = [...new Set(mockData.map(item => `${item.month}/${item.day}/${item.year}`))];

  // Organize the data by date and activity category
  const dataByDate = labels.map(date => {
    return categories.map(category => {
      const activity = mockData.find(item => `${item.month}/${item.day}/${item.year}` === date && item.category === category);
      return activity ? activity.hours : 0; // Default to 0 if no activity for that date/category
    });
  });

  // Bar colors for each category
  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  // Prepare the chart data
  const chartData = {
    labels: labels, // Dates as labels (unique dates only)
    datasets: categories.map((category, index) => ({
      label: category,
      data: dataByDate.map(data => data[index]),
      backgroundColor: backgroundColors[index % backgroundColors.length],
      borderColor: backgroundColors[index % backgroundColors.length].replace('0.2', '1'),
      borderWidth: 1,
    })),
  };

  // Chart options for stacked bars
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
        stacked: true, // Enable stacking on the x-axis
      },
      y: {
        title: {
          display: true,
          text: 'Hours',
        },
        beginAtZero: true,
        stacked: true, // Enable stacking on the y-axis
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

export default BarChart;

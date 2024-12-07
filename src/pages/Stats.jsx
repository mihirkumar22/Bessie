import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import CustomNavbar from '../components/CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StatsBar = () => {
  // Mock data for the chart
  const mockData = [
    { category: 'Work', hours: 40, month: 12, day: 2, year: 2024 },
    { category: 'Exercise', hours: 5, month: 12, day: 3, year: 2024 },
    { category: 'Leisure', hours: 20, month: 12, day: 2, year: 2024 },
    { category: 'Learning', hours: 10, month: 12, day: 2, year: 2024 },
  ];

  // State for the selected time period
  const [timePeriod, setTimePeriod] = useState("30 days");

  // Handle the dropdown change
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

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
    labels: labels,
    datasets: [
      {
        label: 'Hours Spent',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.2', '1')), // Darker borders
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Activities Breakdown by Hours',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Hours',
        },
        beginAtZero: true,
      },
    },
  };

  return (
  
    <div className="container mt-5">
      <CustomNavbar />
      <h1 className="text-center mb-4">Activity Stats</h1>

      {/* Dropdown for selecting time period */}
      <div className="mb-4">
        <label htmlFor="timePeriod" className="form-label">Select Time Period:</label>
        <select
          id="timePeriod"
          className="form-select"
          value={timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="7 days">Last 7 days</option>
          <option value="30 days">Last 30 days</option>
          <option value="1 month">Last 1 month</option>
          <option value="3 months">Last 3 months</option>
          <option value="6 months">Last 6 months</option>
          <option value="1 year">Last 1 year</option>
        </select>
      </div>

      {/* Pie Chart */}
      <div className="d-flex justify-content-center">
        <div style={{ width: '50%' }}>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

import React, { useState } from 'react';
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

    // more data here...
  ];

  // State for the selected time period
  const [timePeriod, setTimePeriod] = useState("30 days");

  // Handle the dropdown change
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  // Get the current date and time
  const now = new Date();

  // Function to calculate the date range for the selected time period
  const getDateRange = () => {
    let startDate;
    switch (timePeriod) {
      case "7 days":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "30 days":
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case "1 month":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3 months":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "6 months":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1 year":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = now;
    }
    return startDate;
  };

  // Filter the data based on the selected time period
  const filteredData = mockData.filter(item => {
    const itemDate = new Date(item.year, item.month - 1, item.day); // Create Date object from item data
    const startDate = getDateRange();
    return itemDate >= startDate; // Keep only the items that are within the selected range
  });

  // Combine hours for the same category per day
  const combinedData = filteredData.reduce((acc, item) => {
    const dateKey = `${item.year}-${item.month}-${item.day}`; // Use year, month, and day as the key
    if (!acc[dateKey]) {
      acc[dateKey] = { 'Work': 0, 'Exercise': 0, 'Leisure': 0, 'Learning': 0 }; // Initialize categories
    }
    acc[dateKey][item.category] += item.hours; // Accumulate hours for each category
    return acc;
  }, {});

  // Prepare data for the chart
  const dates = Object.keys(combinedData); // All unique dates (e.g., '2024-12-01')
  const workHours = dates.map(date => combinedData[date]['Work']);
  const exerciseHours = dates.map(date => combinedData[date]['Exercise']);
  const leisureHours = dates.map(date => combinedData[date]['Leisure']);
  const learningHours = dates.map(date => combinedData[date]['Learning']);

  const chartData = {
    labels: dates, // Dates for the X axis
    datasets: [
      {
        label: 'Work',
        data: workHours,
        backgroundColor: '#F24236',
      },
      {
        label: 'Exercise',
        data: exerciseHours,
        backgroundColor: '#FCCA46',
      },
      {
        label: 'Leisure',
        data: leisureHours,
        backgroundColor: '#3F88C5',
      },
      {
        label: 'Learning',
        data: learningHours,
        backgroundColor: '#32DE8A',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Your activities in the last ${timePeriod}`,
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
      },
    },
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Activity Stats</h1>

      {/* Dropdown for selecting time period */}
    <div className="mb-4">
    <label htmlFor="timePeriod" className="form-label">Select Time Period:</label>
     <select
       id="timePeriod"
       className="form-select"
       value={timePeriod}
       onChange={handleTimePeriodChange}
       style={{ backgroundColor: '#eeeaea' }}
  >
       <option value="7 days">Last 7 days</option>
       <option value="30 days">Last 30 days</option>
       <option value="1 month">Last 1 month</option>
       <option value="3 months">Last 3 months</option>
        <option value="6 months">Last 6 months</option>
       <option value="1 year">Last 1 year</option>
       </select>
    </div>


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

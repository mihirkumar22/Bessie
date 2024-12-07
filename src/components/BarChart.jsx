import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserContext } from '../contexts/UserContext';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const BarChart = () => {
  const { userData } = useUserContext();
  const [activities, setActivities] = useState([]);

  // Fetch activities from userData
  useEffect(() => {
    if (userData?.activities) {
      setActivities(userData.activities);
    }
  }, [userData]);

  // State for the selected time period
  const [timePeriod, setTimePeriod] = useState("30 days");

  // Handle the dropdown change
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  // Function to calculate the date range for the selected time period
  const getDateRange = () => {
    const startDate = new Date(); // Create a fresh copy of the current date
    switch (timePeriod) {
      case "7 days":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "30 days":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "1 month":
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "3 months":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "6 months":
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case "1 year":
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        break;
    }
    return startDate;
  };

  // Filter the data based on the selected time period
  const filteredData = activities.filter((item) => {
    const [year, month, day] = item.date.split("-").map(Number);
    const itemDate = new Date(year, month - 1, day);
    return itemDate >= getDateRange();
  });

  // Combine hours for the same category per day
  const combinedData = filteredData.reduce((acc, item) => {
    const [year, month, day] = item.date.split("-").map(Number);
    const dateKey = `${year}-${month}-${day}`;

    // Initialize categories with lowercase keys
    if (!acc[dateKey]) {
      acc[dateKey] = { exercise: 0, recreation: 0, education: 0 };
    }

    // Normalize the tag to lowercase and ensure the duration is treated as a number
    const normalizedTag = item.tag.toLowerCase();
    const duration = parseFloat(item.duration); // Convert duration to number

    // Check if the tag exists in the initialized object
    if (normalizedTag in acc[dateKey]) {
      acc[dateKey][normalizedTag] += duration; // Accumulate hours
    }

    return acc;
  }, {});

  // Sort dates in descending order (most recent first)
  const sortedDates = Object.keys(combinedData).sort((a, b) => {
    // Ensure date format is consistent before comparing
    const dateA = new Date(a + 'T00:00:00'); // Append time for consistency
    const dateB = new Date(b + 'T00:00:00'); // Append time for consistency
    return dateB - dateA; // Compare dates in descending order
  });



  // Prepare the data for the chart with the sorted dates
  const recreationHours = sortedDates.map((date) => combinedData[date]["recreation"] || 0);
  const exerciseHours = sortedDates.map((date) => combinedData[date]["exercise"] || 0);
  const educationHours = sortedDates.map((date) => combinedData[date]["education"] || 0);

  // Update chart data
  const chartData = {
    labels: sortedDates, // Dates sorted in descending order
    datasets: [
      {
        label: "Recreation",
        data: recreationHours,
        backgroundColor: "#FFCE56",
      },
      {
        label: "Exercise",
        data: exerciseHours,
        backgroundColor: "#36A2EB",
      },
      {
        label: "Education",
        data: educationHours,
        backgroundColor: "#FF6384",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Hours",
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
        <div style={{ width: "70%" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;

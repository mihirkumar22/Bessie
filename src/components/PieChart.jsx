import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserContext } from '../contexts/UserContext'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
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

  // Function to filter mock data based on selected time period
  const getFilteredData = (timePeriod) => {
    const now = new Date();
    return activities.filter(item => {
      const [year, month, day] = item.date.split("-").map(Number);
      const itemDate = new Date(year, month - 1, day); // Adjust month for 0-based index
      const diffTime = now - itemDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24); // Convert time difference to days

      switch (timePeriod) {
        case "7 days":
          return diffDays <= 7;
        case "30 days":
          return diffDays <= 30;
        case "1 month":
          return diffDays <= 30;
        case "3 months":
          return diffDays <= 90;
        case "6 months":
          return diffDays <= 180;
        case "1 year":
          return diffDays <= 365;
        default:
          return true; // Default to all data if no valid time period is selected
      }
    });
  };

  // Get filtered data based on the selected time period
  const filteredData = getFilteredData(timePeriod);

  // Combine the filtered data (aggregate hours by category)
  const aggregatedData = filteredData.reduce((acc, curr) => {
    const key = curr.tag;
    if (acc[key]) {
      acc[key] += curr.duration;
    } else {
      acc[key] = curr.duration;
    }
    return acc;
  }, {});

  // Convert aggregated data to arrays for the chart
  const labels = Object.keys(aggregatedData); // Activity categories
  const data = Object.values(aggregatedData); // Corresponding total hours

  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Minutes Spent',
        data: data,
        backgroundColor: backgroundColors,
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
        text: `Your activities in the last ${timePeriod}`, // Dynamic title based on timePeriod
      },
    },
  };

  // Handle the dropdown change
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
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
          style = {{ backgroundColor: '#eeeaea' }}
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

export default PieChart;

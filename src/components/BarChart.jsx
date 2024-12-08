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
  const [timePeriod, setTimePeriod] = useState('30 days');

  useEffect(() => {
    if (userData?.activities) {
      setActivities(userData.activities);
    }
  }, [userData]);

  const getDateRange = () => {
    const startDate = new Date();
    switch (timePeriod) {
      case '7 days':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30 days':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '1 month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case '3 months':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case '6 months':
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case '1 year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        break;
    }
    return startDate;
  };

  const filteredData = activities.filter((item) => {
    const [year, month, day] = item.date.split('-').map(Number);
    const itemDate = new Date(year, month - 1, day);
    return itemDate >= getDateRange();
  });

  const combinedData = filteredData.reduce((acc, item) => {
    const [year, month, day] = item.date.split('-').map(Number);
    const dateKey = `${year}-${month}-${day}`;
    if (!acc[dateKey]) acc[dateKey] = { exercise: 0, recreation: 0, education: 0 };
    const normalizedTag = item.tag.toLowerCase();
    const duration = parseFloat(item.duration);
    if (normalizedTag in acc[dateKey]) acc[dateKey][normalizedTag] += duration;
    return acc;
  }, {});

  const dates = Object.keys(combinedData).reverse();
  const recreationHours = dates.map((date) => combinedData[date]['recreation'] || 0);
  const exerciseHours = dates.map((date) => combinedData[date]['exercise'] || 0);
  const educationHours = dates.map((date) => combinedData[date]['education'] || 0);

  const chartData = {
    labels: dates,
    datasets: [
      { label: 'Recreation', data: recreationHours, backgroundColor: '#FFCE56' },
      { label: 'Exercise', data: exerciseHours, backgroundColor: '#36A2EB' },
      { label: 'Education', data: educationHours, backgroundColor: '#FF6384' },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Your activities in the last ${timePeriod}` },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Hours' }, beginAtZero: true },
    },
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  return (
    <div style={styles.chartWrapper}>
      <div style={styles.header}>
        <h2>Bar Chart</h2>
      </div>
      <div className="mb-4">
        <label htmlFor="timePeriod" className="form-label">Select Time Period:</label>
        <select
          id="timePeriod"
          className="form-select"
          value={timePeriod}
          onChange={handleTimePeriodChange}
          style={styles.dropdown}
        >
          <option value="7 days">Last 7 days</option>
          <option value="30 days">Last 30 days</option>
          <option value="1 month">Last 1 month</option>
          <option value="3 months">Last 3 months</option>
          <option value="6 months">Last 6 months</option>
          <option value="1 year">Last 1 year</option>
        </select>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

const styles = {
  chartWrapper: {
    width: '45%',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '600',
    fontSize: '18px',
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#eeeaea',
  },
};

export default BarChart;

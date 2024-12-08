import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserContext } from '../contexts/UserContext';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const { userData } = useUserContext();
  const [activities, setActivities] = useState([]);
  const [timePeriod, setTimePeriod] = useState('30 days');

  useEffect(() => {
    if (userData?.activities) {
      setActivities(userData.activities);
    }
  }, [userData]);

  const getFilteredData = () => {
    const now = new Date();
    return activities.filter((item) => {
      const [year, month, day] = item.date.split('-').map(Number);
      const itemDate = new Date(year, month - 1, day);
      const diffTime = now - itemDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      switch (timePeriod) {
        case '7 days': return diffDays <= 7;
        case '30 days': return diffDays <= 30;
        case '1 month': return diffDays <= 30;
        case '3 months': return diffDays <= 90;
        case '6 months': return diffDays <= 180;
        case '1 year': return diffDays <= 365;
        default: return true;
      }
    });
  };

  const filteredData = getFilteredData();

  const aggregatedData = filteredData.reduce((acc, curr) => {
    const key = curr.tag.toLowerCase();
    acc[key] = acc[key] ? acc[key] + curr.duration : curr.duration;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: 'Minutes Spent',
        data: Object.values(aggregatedData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: `Your activities in the last ${timePeriod}` },
    },
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  return (
    <div style={styles.chartWrapper}>
      <div style={styles.header}>
        <h2>Pie Chart</h2>
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
      <Pie data={chartData} options={chartOptions} />
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

export default PieChart;
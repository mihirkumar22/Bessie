import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Stats = () => {
  // Mock data for the chart
  const mockData = [
    { category: 'Work', hours: 40 },
    { category: 'Exercise', hours: 5 },
    { category: 'Leisure', hours: 20 },
    { category: 'Learning', hours: 10 },
  ];

  // Prepare data for the chart
  const labels = mockData.map(item => item.category);
  const data = mockData.map(item => item.hours);
  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Hours Spent',
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} hours`;
          },
        },
      },
      title: {
        display: true,
        text: 'Activities Breakdown by Hours',
      },
    },
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Activity Stats</h1>

      {/* Pie Chart */}
      <div className="d-flex justify-content-center">
        <div style={{ width: '50%' }}>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Stats;

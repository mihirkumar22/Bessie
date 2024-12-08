import React from 'react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import CustomNavbar from '../components/CustomNavbar';

function Stats() {
  return (
    <div style={styles.statsPage}>
      <CustomNavbar />
      <div style={styles.chartContainer}>
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
}

const styles = {
  statsPage: {
    backgroundColor: '#f5f5f7',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'top',
    flexWrap: 'wrap',
    marginTop: '50px',
  },
};

export default Stats;
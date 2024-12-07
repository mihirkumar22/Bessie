import React from 'react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import CustomNavbar from '../components/CustomNavbar';

function Stats() {
    return (
        <div style={{ backgroundColor: '#d9d9d9' }}>
            <div>
                <CustomNavbar />
                <BarChart />
                <PieChart />
            </div>
        </div>
    );
}

export default Stats;
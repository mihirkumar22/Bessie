import React from 'react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import CustomNavbar from '../components/CustomNavbar';

function Stats() {
    return (

        <div>
            <div style={{ width: '50%' }}>
            <CustomNavbar />
            <BarChart />
            <PieChart />
            </div>


        </div>
    )
}

export default Stats;
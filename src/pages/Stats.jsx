import React from 'react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import CustomNavbar from '../components/CustomNavbar';

function Stats() {
    return (

        <div>
            <CustomNavbar />
            <BarChart />
            <PieChart />


        </div>
    )
}

export default Stats;
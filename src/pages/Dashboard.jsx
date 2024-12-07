import React from 'react'
import Card from 'react-bootstrap/Card'
import CustomNavbar from '../components/CustomNavbar';


function Dashboard() {
    
    
    return (
        <div>
            <CustomNavbar />
            <Card>
                <Card.Body>
                    <Card.Title>Dashboard</Card.Title>
                    <Card.Title>Stats</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Dashboard;   


import React from 'react'
import Card from 'react-bootstrap/Card'
import CustomNavbar from '../components/CustomNavbar';
import background from '../images/bessiehomebg.webp'
import { useAuth } from '../contexts/AuthContext'; // Assuming you have this context



function Dashboard() {
    const { currentUser } = useAuth(); // Get current user from AuthContext
    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center',  }}>
            <CustomNavbar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column', // Stack the elements vertically
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    gap: '1px' // Controls the space between the two divs
                }}
            >
                <div style={{ 
                    fontSize: '2.5rem', 
                    textAlign: 'center', 
                    color: 'black' }}>
                    <i>Welcome,</i>
                </div>
                <div
                    style={{
                        fontSize: '4rem',
                        color: 'black',
                        textAlign: 'center',
                        alignItems: 'center'
                    }}
                >
                    <strong> {currentUser?.email || 'No email found'} </strong> 
                </div>
            </div>
        </div>
    )
}

export default Dashboard;


import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import iconBessie from '../images/iconBessie.png';
import background from '../images/bessiehomebg.webp'

function NotLoggedIn() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
        <Card style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fdf7cb' }}>
            <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={iconBessie} style={{ width: '70px', height: 'auto' }} alt="Logo" />
                </div>
                <Card.Text> <b> You are currently not logged into an account. </b> </Card.Text>
                <Link style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} to="/">Go to login</Link>
            </Card.Body>
        </Card>
        </div>


    )
}

export default NotLoggedIn;
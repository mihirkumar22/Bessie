import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

function NotLoggedIn() {    
    return (
        <Card>
            <Card.Body>
                <Card.Text>You are currently not logged into an account.</Card.Text>
                <Link to="/">Go to login</Link>
            </Card.Body>
        </Card>
    )
}

export default NotLoggedIn;
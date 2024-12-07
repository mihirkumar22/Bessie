import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../contexts/AuthContext'

function CustomNavbar() {
    const { logout } = useAuth();

    function handleLogout() {
        return logout();
    }

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Skillstart</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/stats"> Stats</Nav.Link>
                        <Button onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar
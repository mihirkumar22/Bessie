import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useUserContext } from '../contexts/UserContext'
import { useAuth } from '../contexts/AuthContext'

function CustomNavbar() {
    const { userData } = useUserContext();
    const { logout } = useAuth();

    const role = userData.role;

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
                        { !(role === 'admin') && <Nav.Link href="/edit-profile">Profile</Nav.Link>}
                        <Nav.Link href="/postings">Postings</Nav.Link>
                        <Button onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar
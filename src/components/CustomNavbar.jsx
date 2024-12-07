import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../contexts/AuthContext';
import styles from './navstyle.module.css';
import iconBessie from '../images/iconBessie.png';
import leaveicon from '../images/exitsybmol.png';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';

function CustomNavbar() {
    const { logout } = useAuth();
    const [isNavOpen, setIsNavOpen] = useState(false);

    function handleLogout() {
        return logout();
    }

    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <Navbar className={styles.stickyNavbar} expand="lg">
            <Container>
                <div>
                    <img src={iconBessie} style={{ width: '70px', height: 'auto', marginRight: '30px' }} alt="Logo" />
                </div>

                <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleNav} />
                
                <Collapse in={isNavOpen}>
                    <Navbar.Collapse id="navbar-nav" className={styles.navCollapse}>
                        <Nav className={styles.navOptions} style={{ fontSize: '2rem' }}>
                            <Nav.Link href="/dashboard" className={styles.navItem}>Dashboard</Nav.Link>
                            <Nav.Link href="/activities" className={styles.navItem}>Activities</Nav.Link>
                            <Nav.Link href="/stats" className={styles.navItem}>Stats</Nav.Link>
                        </Nav>
                        <Button 
                            className={styles.noStyleButton} 
                            onClick={handleLogout} 
                            style={{ marginLeft: 'auto' }}
                        >
                            <img src={leaveicon} style={{ width: '70px', height: 'auto'}} alt="Logout" />
                        </Button>
                    </Navbar.Collapse>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;

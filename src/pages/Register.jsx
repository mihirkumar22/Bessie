import React, { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import iconBessie from '../images/iconBessie.png';
import background from '../images/bessiehomebg.webp'

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center'
                }}
            >
                <Card style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fdf7cb' }}>
                    <Card.Body>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={iconBessie} style={{ width: '70px', height: 'auto'}} alt="Logo" />
                        </div>
                        <Card.Title className="text-center"><u> Register </u> </Card.Title>
                        <p  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <i> <b> Bessie, your personal Habit Tracker </b> </i></p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
                            </Form.Group>
                            <br></br>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" ref={passwordRef} />
                            </Form.Group>
                            <br></br>
                            <Button type="submit" disabled={loading} style={{ width: '100%' }}>
                                {loading ? "Loading..." : "Submit"}
                            </Button>
                        </Form>
                        <Card.Text className="text-center mt-3">
                            Already an account? <Link to="/login">Login with an existing account</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
import React, { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

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
        <Card>
            <Card.Body>
                <Card.Title>Register</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" ref={passwordRef} />
                    </Form.Group>
                    <Button disabled={loading} type="submit">
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </Form>
                <Card.Text>Already have an account? <Link to="/login">Log In</Link></Card.Text>
            </Card.Body>
        </Card>
    )
}
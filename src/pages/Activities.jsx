import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useUserContext } from '../contexts/UserContext';


function Activities() {
    const { userData, updateUserData } = useUserContext();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(
        {
            id: '',
            title: '',
            description: '',
            tag: '',
            time: '',
            duration: '',
            date: '',
        }
    );

    useEffect(() => {
        setActivities(userData.activities)
    }, [userData])

    function handleShow() { setShow(true) };
    function handleClose() { setShow(false) };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleTagChange(value) {
        setFormData((prev) => ({
            ...prev,
            tag: value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Assuming that activities is an array that contains previous activities
            const newActivity = {
                ...formData,
                id: new Date().toISOString(), // generate a unique id (e.g., timestamp)
            };

            // Save the activity (this will be merged with other user data)
            const updatedUserData = {
                ...userData,
                activities: [...userData.activities, newActivity],  // Add the new activity
            };

            await updateUserData(updatedUserData); // Update user data with the new activity
        } catch (error) {
            console.error("Error updating user data:", error);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Button
                        onClick={handleShow}
                    >
                        + Add Activity
                    </Button>
                    <Card.Title>Activities</Card.Title>
                    {activities.map((activity) => (
                        <Card key={activity.id}>
                            {activity.tag}
                        </Card>
                    ))}
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make a new activty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                value={formData.title}
                                type="text"
                                placeholder="Activity Title"
                                onChange={handleChange}
                                style={{ marginBottom: '1em' }}
                                required
                            />
                            <Form.Control
                                name="description"
                                value={formData.description}
                                type="text"
                                placeholder="Activity Description"
                                onChange={handleChange}
                                style={{ marginBottom: '1em' }}
                                required
                            />
                            <Form.Control
                                name="date"
                                value={formData.date}
                                type="date"
                                placeholder="MM/DD/YYYY"
                                onChange={handleChange}
                                style={{ marginBottom: '1em' }}
                                required
                            />
                            <Form.Control
                                name="duration"
                                value={formData.duration}
                                type="text"
                                placeholder="Duration (minutes)"
                                onChange={handleChange}
                                style={{ marginBottom: '1em' }}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Set tags</Form.Label>
                            <ToggleButtonGroup type="radio" name="tags" value={formData.tag} onChange={handleTagChange}>
                                <ToggleButton id="education" value="education">
                                    Education
                                </ToggleButton>
                                <ToggleButton id="recreation" value="recreation">
                                    Recreation
                                </ToggleButton>
                                <ToggleButton id="exercise" value="exercise">
                                    Exercise
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Making post..." : "Submit"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Activities;
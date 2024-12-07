import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useUserContext } from '../contexts/UserContext';
import CustomNavbar from '../components/CustomNavbar';

function Activities() {
    const { userData, updateUserData, loading: userLoading } = useUserContext(); // Ensure loading state from context
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        tag: '',
        time: '',
        duration: '',
        date: '',
    });
    const [editing, setEditing] = useState(null);

    // Update activities when userData changes
    useEffect(() => {
        if (userData && userData.activities) {
            setActivities(userData.activities);
        }
    }, [userData]);

    function handleShow() {
        setShow(true);
    }
    function handleClose() {
        setShow(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleTagChange(value) {
        setFormData((prev) => ({
            ...prev,
            tag: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let updatedActivities;

            if (editing) {
                // If editing, find the activity by its id and update it
                updatedActivities = activities.map((activity) =>
                    activity.id === formData.id ? { ...activity, ...formData } : activity
                );
            } else {
                // If not editing, create a new activity and append it
                const newActivity = {
                    ...formData,
                    id: new Date().toISOString(), // Generate a unique ID
                };
                updatedActivities = [...activities, newActivity];
            }

            const updatedUserData = {
                ...userData,
                activities: updatedActivities, // Set the updated activities list
            };

            await updateUserData(updatedUserData); // Update user data

        } catch (error) {
            console.error('Error updating user data:', error);
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    function handleEdit(activityId) {
        setEditing(true);
        handleShow();
        const activityData = activities.find(activity => activity.id === activityId);

        if (activityData) {
            setFormData(activityData);  // Assuming setFormData is used to populate the form
        } else {
            console.log("Activity not found");
        }
    }

    function handleDelete(activityId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this posting?")
        if (confirmDelete) {
            const updatedActivities = activities.filter(activity => activity.id !== activityId);

            const updatedUserData = {
                ...userData,
                activities: updatedActivities
            }
            updateUserData(updatedUserData);
        }
    }

    if (userLoading) {
        return <div>Loading user data...</div>; // Show a loading message while userData is being fetched
    }

    if (!userData) {
        return <div>No user data available. Please log in.</div>; // Handle null userData
    }

    return (

        <>
            <CustomNavbar />

            <Card>
                <Card.Body>
                    <Button onClick={() => { handleShow(); setEditing(false); }}>+ Add Activity</Button>
                    <Card.Title>Activities</Card.Title>
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <Card key={activity.id}>
                                <Card.Body>
                                    <Card.Header>
                                        <Card.Title>
                                            {activity.title}
                                        </Card.Title>
                                        <Button onClick={() => handleEdit(activity.id)}>Edit</Button>
                                        <Button onClick={() => handleDelete(activity.id)}>Delete</Button>
                                    </Card.Header>
                                    <Card.Text>
                                        Description: {activity.description}
                                        <br></br>
                                        Date: {activity.date}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div>No activities found.</div>
                    )}
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make a new activity</Modal.Title>
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                value={formData.description}
                                type="text"
                                placeholder="Activity Description"
                                onChange={handleChange}
                                style={{ marginBottom: '1em' }}
                                required
                            />
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                name="date"
                                value={formData.date}
                                type="date"
                                onChange={handleChange}
                                style={{ marginBottom: '1em' }}
                                required
                            />
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                name="duration"
                                value={formData.duration}
                                type="number"
                                placeholder="Duration (hours)"
                                onChange={handleChange}
                                style={{ marginBottom: '1em' }}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Set tags</Form.Label>
                            <ToggleButtonGroup
                                type="radio"
                                name="tags"
                                value={formData.tag}
                                onChange={handleTagChange}
                            >
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
                            {loading ? 'Making post...' : 'Submit'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Activities;

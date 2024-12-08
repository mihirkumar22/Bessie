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
            {/* Custom Navbar with the styles applied */}
            <div style={styles.navbarWrapper}>
                <CustomNavbar />
            </div>

            <Card style={styles.card}>
                <Card.Body>
                    <Button onClick={() => { handleShow(); setEditing(false); }} style={styles.addButton}>+ Add Activity</Button>
                    <Card.Title style={styles.cardTitle}>Activities</Card.Title>
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <Card key={activity.id} style={styles.activityCard}>
                                <Card.Body>
                                    <Card.Header style={styles.activityHeader}>
                                        <Card.Title style={styles.activityTitle}>
                                            {activity.title}
                                        </Card.Title>
                                        <Button onClick={() => handleEdit(activity.id)} style={styles.actionButton}>Edit</Button>
                                        <Button onClick={() => handleDelete(activity.id)} style={styles.actionButton}>Delete</Button>
                                    </Card.Header>
                                    <Card.Text style={styles.activityDescription}>
                                        Description: {activity.description}
                                        <br />
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

            <Modal show={show} onHide={handleClose} centered style={styles.modal}>
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
                                style={styles.formControl}
                                required
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                value={formData.description}
                                type="text"
                                placeholder="Activity Description"
                                onChange={handleChange}
                                style={styles.formControl}
                                required
                            />
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                name="date"
                                value={formData.date}
                                type="date"
                                onChange={handleChange}
                                style={styles.formControl}
                                required
                            />
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                name="duration"
                                value={formData.duration}
                                type="number"
                                placeholder="Duration (hours)"
                                onChange={handleChange}
                                style={styles.formControl}
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
                                style={styles.tagGroup}
                            >
                                <ToggleButton id="education" value="education" style={styles.tagButton}>
                                    Education
                                </ToggleButton>
                                <ToggleButton id="recreation" value="recreation" style={styles.tagButton}>
                                    Recreation
                                </ToggleButton>
                                <ToggleButton id="exercise" value="exercise" style={styles.tagButton}>
                                    Exercise
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>
                        <Button type="submit" disabled={loading} style={styles.submitButton}>
                            {loading ? 'Making post...' : 'Submit'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

// Styles object for navbar and page
const styles = {
  navbarWrapper: {
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    marginBottom: '20px',
    borderRadius: '20px 20px 0 0',
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#f5f5f7', // Soft Apple-like background color
  },
  card: {
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    padding: '20px',
    margin: '20px 0',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    color: 'white',
    fontWeight: '500',
    borderRadius: '15px',
    marginBottom: '10px',
    padding: '10px 20px',
  },
  activityCard: {
    marginBottom: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  activityHeader: {
    backgroundColor: '#f1f1f1',
    padding: '15px',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
  },
  activityTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  activityDescription: {
    color: '#555',
    fontSize: '14px',
  },
  actionButton: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    color: 'white',
    fontWeight: '500',
    borderRadius: '10px',
    margin: '0 5px',
    padding: '5px 15px',
  },
  modal: {
    borderRadius: '20px',
    backgroundColor: '#f9f9f9',
  },
  formControl: {
    borderRadius: '15px',
    borderColor: '#d1d1d6',
    marginBottom: '1.5em',
    boxShadow: 'none',
  },
  tagGroup: {
    marginBottom: '20px',
  },
  tagButton: {
    backgroundColor: '#f0f0f5',
    borderColor: '#ccc',
    color: '#007aff',
    borderRadius: '15px',
    marginRight: '10px',
    padding: '10px 20px',
  },
  submitButton: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    color: 'white',
    fontWeight: '600',
    borderRadius: '15px',
    padding: '12px 20px',
  },
};

export default Activities;

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Calendar from '../components/Calendar';
import { Modal, Form } from 'react-bootstrap'; // Import necessary Bootstrap components
import { useUserContext } from '../contexts/UserContext';

export default function Calendars() {
  const { userData, updateUserData } = useUserContext();

  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [todo, setTodo] = useState({ name: '', date: '' }); // Store to-do item as an object

  // Handle showing and hiding the modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Handle form submission, adding to the todo list in userData
  const handleSubmit = () => {
    const newTodo = { ...todo }; // Clone the new to-do item
    const updatedTodos = [...userData.todo, newTodo]; // Add new to-do to the existing todo array

    // Update userData with the new todo array
    updateUserData({ ...userData, todo: updatedTodos });
    
    handleClose(); // Close the modal after submitting
  };

  // Handle input changes for to-do name and date
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  // Prepare markedDates to pass to the Calendar component
  const markedDates = userData?.todo.reduce((acc, todoItem) => {
    // If the date already exists, add the new to-do item to it
    if (!acc[todoItem.date]) {
      acc[todoItem.date] = { todoItems: [] };
    }
    acc[todoItem.date].todoItems.push(todoItem); // Add the to-do item to the date's array

    return acc;
  }, {});

  return (
    <>
      <Card>
        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '65vw' }}>
            <Calendar markedDates={markedDates} /> {/* Pass the markedDates to the Calendar */}
          </div>
          <Button style={{ marginLeft: '20px' }} onClick={handleShow}>Add To-Do</Button> {/* Button opens modal */}
        </Card.Body>
      </Card> 

      {/* Modal for adding to-do */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="todoName">
              <Form.Label>To-Do Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter to-do name"
                name="name"
                value={todo.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="todoDate">
              <Form.Label>To-Do Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={todo.date}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save To-Do</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

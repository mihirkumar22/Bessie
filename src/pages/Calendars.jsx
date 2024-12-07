import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Calendar from '../components/Calendar';

export default function Calendars() {
    return (
        <Card>
            <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '65vw' }}>
                    <Calendar />
                </div>
                <Button style={{ marginLeft: '20px' }}>Add</Button> {/* Add margin to separate button */}
            </Card.Body>
        </Card> 
    );
}

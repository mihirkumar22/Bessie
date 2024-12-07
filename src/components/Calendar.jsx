import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // FullCalendar day grid plugin

export default function Calendar({ userData }) {
  // Convert userData.todo items into events format
  const events = userData?.todo.map((todoItem) => ({
    title: todoItem.name, // Use the name of the to-do item
    date: todoItem.date,   // Date of the to-do item
    color: todoItem.color, // Color associated with the to-do item
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events} // Pass the events to FullCalendar
    />
  );
}

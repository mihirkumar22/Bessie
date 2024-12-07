import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // FullCalendar day grid plugin

export default function Calendar({ markedDates }) {
  // Convert markedDates (to-dos) into events for FullCalendar
  const events = Object.keys(markedDates).map(date => {
    const todoItems = markedDates[date].todoItems; // Get to-do items for that date
    return todoItems.map(todo => ({
      title: todo.name,  // Use the name of the to-do item
      date: date,        // Use the date from the markedDates
      color: 'blue',     // Customize the color of the event dot
    }));
  }).flat(); // Flatten the array since each date can have multiple to-do items

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events} // Pass events to FullCalendar
    />
  );
}

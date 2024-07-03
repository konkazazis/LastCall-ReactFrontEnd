import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

function Schedule() {

  const events = [
    {
      title: 'Kostas 18:00-02:00',
      start: new Date(2024, 0, 10, 10, 0),
      end: new Date(2024, 0, 10, 12, 0),
    },
    {
      title: 'Thylla 18:00-02:00',
      start: new Date(2024, 0, 12, 12, 0),
      end: new Date(2024, 0, 12, 14, 0),
    },
    // Add more events as needed
  ];
  return (
    <div className='animate__animated animate__fadeIn m-2'>
         <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
      />
    </div>
  )
}

export default Schedule;
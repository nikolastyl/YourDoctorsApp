import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "./index.css";



const localizer = momentLocalizer(moment);


export const Bookings = (props) => {

    const [date, setDate] = useState(new Date());

    const handleNavigate = (newDate) => {
        setDate(newDate);
    };
//τα ωραρια των γιατρων
    const getEventsForDay = (date) => {
        const startMorning = moment(date).startOf('day').toDate();
        const endMorning = moment(date).startOf('day').add(9, 'hours').toDate();
        const startEvening = moment(date).startOf('day').add(14, 'hours').toDate();
        const endEvening = moment(date).startOf('day').add(17, 'hours').toDate();
        const startAfternoon = moment(date).startOf('day').add(20, 'hours').toDate();
        const endAfternoon = moment(date).endOf('day').toDate();

        return [
            {
                title: 'CLOSED',
                start: startMorning,
                end: endMorning,
            },
            {
                title: 'CLOSED',
                start: startEvening,
                end: endEvening,
            },
            {
                title: 'CLOSED',
                start: startAfternoon,
                end: endAfternoon,
            },
        ];
    };

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.title === 'CLOSED' ? 'green' : 'green',
            color: 'white',
        };
        return {
            style,
        };
    };




        const events = [
        {
            title: 'Event 1',
            start: new Date(),
            end: new Date(),
        },
        // Προσθέστε περισσότερα events εδώ...
    ];

    const onChange = (selectedDate) => {
        setDate(selectedDate);
    };





    return (
        <div className="app">
            <h1>Welcome To YourDoctorsApp</h1>

            <div className="login-form">
                <form >
                    <div style={{ height: '500px' }}>
                        <Calendar
                            localizer={localizer}
                            onChange={onChange}
                            value={date}
                            onNavigate={handleNavigate}
                            events={getEventsForDay(date)}
                            eventPropGetter={eventStyleGetter}

                        />
                    </div>

                </form>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import "./index.css";



const localizer = momentLocalizer(moment);


export const Bookings = (props) => {

    const { selectedDoctor } = props;
    console.log(selectedDoctor)
    const [infos, setInfos] =  useState([]);

    useEffect(() => {
        axios.get(`/api/doctors/selectedDoc?doctor=${selectedDoctor}`)
        .then(response => {
            console.log(response.data)
            setInfos(response.data)
            })
            .catch(error => {
            console.error("Σφάλμα κατά τη λήψη των περιοχών:", error);
      });
    },[]);

    console.log(infos[0])


    const [date, setDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month'); // Αρχική προβολή: 'month'

    


    

    const handleNavigate = (newDate) => {
        setDate(newDate);
    };


//τα ωραρια των γιατρων
    const getEventsForDay = (date) => {

        if (currentView === 'month') {
            return [];
          }

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
    ];

    const onChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const onViewChange = (view) => {
        setCurrentView(view); 
      };
    
    
   
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
    setIsOpen(!isOpen);
    }

    return (
        
        <div className="app">  
        <p>Doctor's Infos</p>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            
                <button className="button2" onClick={toggleSidebar}>
                    Doctor's Infos
                </button>
                <ul className="sidebar-list">
                    <li className={`sidebar-item ${selectedDoctor != null ? 'green' : ''}`}>{selectedDoctor != null && selectedDoctor}</li>
                    <li className="sidebar-item">Phone: {infos.length>0 && (infos[1])}</li>
                    <li className="sidebar-item">Email: {infos.length>0 && (infos[2])}</li>
                    <li className="sidebar-item">Address: {infos.length>2 && (infos[3])}</li>
                </ul>
            </div>  
             
            <h1>Welcome To YourDoctorsApp</h1>
                
            <div className="login-form">
                <form >
                {selectedDoctor!=null && (
                    <h2>{selectedDoctor}</h2>
                )}
                    <div style={{ height: '500px' }}>
                        <Calendar
                            localizer={localizer}
                            onChange={onChange}
                            value={date}
                            onNavigate={handleNavigate}
                            events={getEventsForDay(date)}
                            eventPropGetter={eventStyleGetter}
                            views={['month', 'day','agenda']} 
                            view={currentView} 
                            onView={onViewChange} 
                        />

                    </div>

                </form>
            </div>
        </div>
    );
    
};

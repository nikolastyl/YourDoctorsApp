import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import "./index.css";

const localizer = momentLocalizer(moment);

export const Bookings = (props) => {
  const { selectedDoctor } = props;
  const [infos, setInfos] = useState([]);
  const [weeklySchedule,setWeeklyShedule]= useState([]);

  useEffect(() => {
    axios
      .get(`/api/doctors/selectedDoc?doctor=${selectedDoctor}`)
      .then(response => {
        console.log(response.data);
        setInfos(response.data);
      })
      .catch(error => {
        console.error("Σφάλμα κατά τη λήψη των περιοχών:", error);
      });
  }, []);

  useEffect(() => {
    console.log(infos.length);
    // Καλέστε την API για τη λήψη των ειδικοτήτων
    if (infos.length > 0 && infos[0]) {
      axios
        .get(`/api/doctors/shedule?amka=${infos[0]}`)
        .then(response => {
          setWeeklyShedule(response.data)
          //console.log(response.data)
        })
        .catch(error => {
          console.error("Σφάλμα κατά τη λήψη των περιοχών:", error);
        });
    }
  }, [infos]);

  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  const handleNavigate = newDate => {
    setDate(newDate);
  };

  const getEventsForDay = date => {
    if (currentView === 'month') {
      return [];
    }

    const dayIndex = moment(date).isoWeekday() - 1;
    

    const daySchedule = weeklySchedule[dayIndex];

    if (daySchedule.includes('-')) {
      return [
        {
          title: 'CLOSED',
          start: moment(date).startOf('day').toDate(),
          end: moment(date).endOf('day').toDate(),
        },
      ];
    }

    const events = [];
    let x=0;

    daySchedule.forEach(timeSlot => {
        
      if (timeSlot !== '-') {
        if (weeklySchedule[dayIndex].length === 1) {
          const [startHour, endHour] = timeSlot.split('-');

          const start = moment(date)
            .hour(parseInt(startHour))
            .startOf('hour')
            .toDate();

          const end = moment(date)
            .hour(parseInt(endHour))
            .endOf('hour')
            .toDate();
        const goToSleep = moment(date).endOf('day').toDate();
        const morningSleep = moment(date).startOf('day').toDate();

          events.push({
            title: 'CLOSED',
            start: morningSleep,
            end: start,
          },
          {
            title: 'CLOSED',
            start: end,
            end: goToSleep,
          })
        }

        if (weeklySchedule[dayIndex].length === 2) {
          const [morningHours, eveningHours] = weeklySchedule[dayIndex];

          const [morningStartHour, morningEndHour] = morningHours.split('-');
          const [eveningStartHour, eveningEndHour] = eveningHours.split('-');

          const morningSleep = moment(date).startOf('day').toDate();
          const morningStart = moment(date)
            .hour(parseInt(morningStartHour))
            .startOf('hour')
            .toDate();
          const morningEnd = moment(date)
            .hour(parseInt(morningEndHour))
            .endOf('hour')
            .toDate();
          const eveningStart = moment(date)
            .hour(parseInt(eveningStartHour))
            .startOf('hour')
            .toDate();
          const eveningEnd = moment(date)
            .hour(parseInt(eveningEndHour))
            .endOf('hour')
            .toDate();
          const goToSleep = moment(date).endOf('day').toDate();
          x=x+1;
          if(x==2){
          events.push(
            {
              title: 'CLOSED',
              start: morningSleep,
              end: morningStart,
            },
            {
              title: 'CLOSED',
              start: morningEnd,
              end: eveningStart,
            },
            {
              title: 'CLOSED',
              start: eveningEnd,
              end: goToSleep,
            }
          );
        }
      }
    }
    });
    
    return events;
  };

  const eventStyleGetter = event => {
    const style = {
      backgroundColor: event.title === 'CLOSED' ? 'green' : 'green',
      color: 'white',
    };
    return {
      style,
    };
  };

  const onChange = selectedDate => {
    setDate(selectedDate);
  };

  const onViewChange = view => {
    setCurrentView(view);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app">
      <p>Doctor's Infos</p>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="button2" onClick={toggleSidebar}>
          Doctor's Infos
        </button>
        <ul className="sidebar-list">
          <li className={`sidebar-item ${selectedDoctor != null ? 'green' : ''}`}>
            {selectedDoctor != null && selectedDoctor}
          </li>
          <li className="sidebar-item">Phone: {infos.length > 0 && infos[1]}</li>
          <li className="sidebar-item">Email: {infos.length > 0 && infos[2]}</li>
          <li className="sidebar-item">Address: {infos.length > 2 && infos[3]}</li>
        </ul>
      </div>

      <h1>Welcome To YourDoctorsApp</h1>

      <div className="login-form">
        <form>
          {selectedDoctor != null && <h2>{selectedDoctor}</h2>}
          <div style={{ height: '500px' }}>
            <Calendar
              localizer={localizer}
              onChange={onChange}
              value={date}
              onNavigate={handleNavigate}
              events={getEventsForDay(date)}
              eventPropGetter={eventStyleGetter}
              views={['month', 'day', 'agenda']}
              view={currentView}
              onView={onViewChange}
            />
          </div>
          <br></br>
          <button onClick={() => props.onFormSwitch('choices')}>Previous</button>
        </form>
      </div>
    </div>
  );
};

export default Bookings;

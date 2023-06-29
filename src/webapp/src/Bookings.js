import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import "./index.css";

const localizer = momentLocalizer(moment);
moment.tz.setDefault('Europe/Athens');


export const Bookings = (props) => {
  const { patientAmka,selectedDoctor } = props;
  const [infos, setInfos] = useState([]);
  const [weeklySchedule,setWeeklyShedule]= useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null); // Καθορίζει την επιλεγμένη ώρα
  const [appointments, setAppointments] = useState([]); // Κρατάει τα ραντεβού από τη βάση δεδομένων
  const updatedEvents = [];
  const [events, setEvents] = useState([]);
  let events2=[];
  const [patientApps,setPatientApps]=useState([]);


  let x=0;



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
          console.log(response.data)
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

  



    daySchedule.forEach(timeSlot => {
        
      if (timeSlot !== '-') {
        if (weeklySchedule[dayIndex].length === 1) {
          const [startHour, endHour] = timeSlot.split('-');

          const start = moment(date)
            .hour(parseInt(startHour))
            .startOf('hour')
            .tz('Europe/Athens')
            .toDate();

          const end = moment(date)
            .hour(parseInt(endHour))
            .endOf('hour')
            .tz('Europe/Athens')
            .toDate();
            const goToSleep = moment(date).endOf('day').toDate();
            const morningSleep = moment(date).startOf('day').toDate();
            if(x==0){
                events2=[]

                events2.push(
                    {
                        title: 'CLOSED',
                        start: morningSleep,
                        end: start,
                    },
                    {
                        title: 'CLOSED',
                        start: end,
                        end: goToSleep,
                    }
                );
            }
    }

        if (weeklySchedule[dayIndex].length === 2) {
          const [morningHours, eveningHours] = weeklySchedule[dayIndex];

          const [morningStartHour, morningEndHour] = morningHours.split('-');
          const [eveningStartHour, eveningEndHour] = eveningHours.split('-');

          const morningSleep = moment(date).startOf('day').toDate();
          const morningStart = moment(date)
            .hour(parseInt(morningStartHour))
            .startOf('hour')
            .tz('Europe/Athens')
            .toDate();
          const morningEnd = moment(date)
            .hour(parseInt(morningEndHour-1))
            .endOf('hour')
            .tz('Europe/Athens')
            .toDate();
          const eveningStart = moment(date)
            .hour(parseInt(eveningStartHour))
            .startOf('hour')
            .tz('Europe/Athens')
            .toDate();
          const eveningEnd = moment(date)
            .hour(parseInt(eveningEndHour-1))
            .endOf('hour')
            .tz('Europe/Athens')
            .toDate();
          const goToSleep = moment(date).endOf('day').toDate();
          x=x+1;
          if(x==2){
            events2=[]
            events2.push(
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
            )
            
        }
      }
    }
    });
    const mergedEvents = events.concat(events2);

    return mergedEvents
  };

  const eventStyleGetter = event => {
  let style = {
    backgroundColor: 'green',
    color: 'white',
  };

  if (event.title === 'CLOSED') {
    style.backgroundColor = 'green';
  } else if (event.title === 'appointment') {
    style.backgroundColor = 'blue';
  }

  return {
    style,
  };
}

  const onChange = selectedDate => {
    setDate(selectedDate);
  };

  const onViewChange = view => {
    setCurrentView(view);
  };

  const [isOpenSidebar1, setIsOpenSidebar1] = useState(false);
  const [isOpenSidebar2, setIsOpenSidebar2] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpenSidebar1(!isOpenSidebar1);
  };
  
  const toggleSidebar2 = () => {
    setIsOpenSidebar2(!isOpenSidebar2);
  };

  //
  const handleSlotSelect = slotInfo => {
    setSelectedSlot(slotInfo);
  };

  const handleConfirmBooking = () => {
    // Έλεγχος αν έχει επιλεγεί ώρα
    if (selectedSlot) {
      // Δημιουργία νέου γεγονότος
      const newEvent = {
        title: 'appointment',
        start: selectedSlot.start,
        end: selectedSlot.end,
      };
      console.log(selectedSlot.start)

      

      const appointment = {
        amka_patient:patientAmka,
        amka_doctor:infos[0],
        appointment_start:newEvent.start,
        appointment_end:newEvent.end
    };
    setAppointments(appointments => [appointments,appointment]);
    console.log(appointments)
    
    
    console.log(newEvent.start)
    console.log(newEvent.end)
    console.log(appointment.appointment_start)
      axios
        .post('/api/appointment/save',appointment)
        .then(response => {
            console.log('Το ραντεβού δημιουργήθηκε με επιτυχία');
            // Ενημέρωση της κατάστασης των γεγονότων
            setEvents(events => [...events, newEvent]);
        })
        .catch(error => {
            console.log(error.response);
            console.error('Σφάλμα κατά τη δημιουργία του ραντεβού:', error);
        });  
      
      // Καθαρισμός της επιλεγμένης ώρας
      setSelectedSlot(null);
    }
  }
  const handleCancelBooking = () => {
    // Ακυρώνουμε την επιλογή της ώρας
    setSelectedSlot(null);
    setEvents([]);
  };
  //
  console.log(infos[0])
  useEffect(() => {
    if (infos.length > 0 && infos[0]) {
    // Καλέστε την API για να λάβετε τα ραντεβού από τη βάση δεδομένων
    axios
      .get(`/api/appointment/database?amka_doctor=${infos[0]}`)
      .then(response => {
        console.log(response.data);
        const fetchedEvents = response.data.map(item => ({
          title: 'appointment',
          start: new Date(item.appointment_start), 
          end: new Date(item.appointment_end),
        }));
        console.log(fetchedEvents);
        setEvents(events => [...events, ...fetchedEvents]);
      })
      .catch(error => {
        console.error('Σφάλμα κατά τη λήψη των ραντεβού:', error);
      });
  }}, [infos]);


  useEffect(() => {
    axios
      .get(`/api/appointment/patientApps?patient_amka=${patientAmka}`)
      .then(response => {
        console.log(response.data);
        setPatientApps(response.data)
      })
      .catch(error => {
        console.error('Σφάλμα κατά τη λήψη των ραντεβού:', error);
      });
  }, [events]);

const deleteApp=(appointment)=>{
    if (window.confirm("Are you sure you want to delete this appointment?")) {
//
//
        axios
          .post("/api/appointment/delete", appointment)
          .then((response) => {
            console.log("Το ραντεβού διαγράφηκε με επιτυχία");    
            const updatedAppointments = patientApps.filter(
              (app) => app.appointment_start !== appointment.appointment_start
            );
            setPatientApps(updatedAppointments);  

            })
          .catch((error) => {
            console.log(error.response);
            console.error("Σφάλμα κατά τη διαγραφή του ραντεβού:", error);
          });
      }

}

  return (
    <div className="app">
        <h1>Welcome To YourDoctorsApp</h1>

    <div className={`sidebar ${isOpenSidebar1 ? 'open' : ''}`}>
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

  <div className={`sidebar2 ${isOpenSidebar2 ? 'open' : ''}`}>
    <button className="button3" onClick={toggleSidebar2}>
      My Appointments
    </button>
    <ul className="sidebar-list">
        <li>APPOINTMENTS</li>
        {patientApps.map(appointment => (
            <li className="sidebar-item" key={appointments.appointment_start}>
                {'Doctor:'}: {appointment.amka_doctor}
                <br></br>
                {'Appointment:'}: {appointment.appointment_start}
                <button className="delete-button" onClick={() => deleteApp(appointment)} >x</button>
            </li>
    ))}
    </ul>
  </div>


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
              selectable={true} // Ενεργοποίηση της επιλογής ώρας
              onSelectSlot={handleSlotSelect} // Χειρισμός της επιλογής ώρας
            />
            {selectedSlot && (
              <div>
                <p>Επιλέξατε την ώρα:</p>
                <p>
                  Από: {moment(selectedSlot.start).format('HH:mm')} Έως:{' '}
                  {moment(selectedSlot.end).format('HH:mm')}
                </p>
                <button onClick={handleConfirmBooking}>Confirm</button>
                <button onClick={handleCancelBooking}>cancel</button>
              </div>
            )}
          </div>
          <br></br>
          {!selectedSlot && (
          <button onClick={() => props.onFormSwitch('choices',patientAmka)}>Previous</button>)}
        </form>
      </div>
    </div>
  );
};

export default Bookings;

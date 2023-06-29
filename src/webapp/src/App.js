import React, { useState } from "react";
import logo from './logo.svg';
import "./index.css";

import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Choices} from "./Choices";
import {Doctors} from "./Doctors";
import {Bookings} from "./Bookings";
import {Appointments} from "./Appointments";


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientAmka, setPatientAmka] = useState(null);

  





  const toggleForm = (formName,param,param2,param3) => {
    setCurrentForm(formName);
    setPatientAmka(param)
    console.log(param)
    setSelectedSpecialty(param2);
    setSelectedArea(param3);
    setSelectedDoctor(param2)
  }

  return (
      <div className="App">
        {currentForm === 'login' ? (
            <Login onFormSwitch={toggleForm} />
        ) : currentForm === 'register' ? (
            <Register onFormSwitch={toggleForm} />
        ) : currentForm === 'choices' ? (
            <Choices onFormSwitch={toggleForm}
            patientAmka={patientAmka}/>
        ) : currentForm === 'doctors' ? (
            <Doctors onFormSwitch={toggleForm}
            patientAmka={patientAmka}
            selectedSpecialty={selectedSpecialty}
            selectedArea={selectedArea}
            />
        ) : currentForm === 'bookings' ? (
            <Bookings onFormSwitch={toggleForm} 
            selectedDoctor={selectedDoctor}
            patientAmka={patientAmka}
            />
        ) : currentForm === 'appointments' ? (
            <Appointments onFormSwitch={toggleForm} />
        ) : null}
      </div>
  );
}

export default App;
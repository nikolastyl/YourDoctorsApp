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
  





  const toggleForm = (formName,param,param2) => {
    setCurrentForm(formName);
    setSelectedSpecialty(param);
    setSelectedArea(param2);
    setSelectedDoctor(param)
  }

  return (
      <div className="App">
        {currentForm === 'login' ? (
            <Login onFormSwitch={toggleForm} />
        ) : currentForm === 'register' ? (
            <Register onFormSwitch={toggleForm} />
        ) : currentForm === 'choices' ? (
            <Choices onFormSwitch={toggleForm}/>
        ) : currentForm === 'doctors' ? (
            <Doctors onFormSwitch={toggleForm}
            selectedSpecialty={selectedSpecialty}
            selectedArea={selectedArea}/>
        ) : currentForm === 'bookings' ? (
            <Bookings onFormSwitch={toggleForm} 
            selectedDoctor={selectedDoctor}
            />
        ) : currentForm === 'appointments' ? (
            <Appointments onFormSwitch={toggleForm} />
        ) : null}
      </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import "./index.css";
import Select from 'react-select';
import axios from 'axios';

export const Doctors = (props) => {

const { selectedSpecialty,selectedArea } = props;

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [doctors, setDoctors] = useState([]);

  // Μετασχηματισμός των ειδικοτήτων
  const transformedDoctors = doctors.map(doc => ({
    label: doc,
    value: doc
  }));

  const handleDoctorChange = (option) => {
    setSelectedDoctor(option);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(selectedSpecialty)
    if (selectedDoctor == null) {
      setErrorMessages({ name: "doctor", message: errors.doctor });
    } else {
        props.onFormSwitch('bookings',selectedDoctor.value);
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const errors = {
    doctor: "please select a doctor",
  };

  
  useEffect(() => {
    axios.get(`/api/doctors/docs?specialty=${selectedSpecialty}&area=${selectedArea}`)
    .then(response => {
        setDoctors(response.data);
        })
        .catch(error => {
        console.error("Σφάλμα κατά τη λήψη των περιοχών:", error);
  });
},[]);

  return (
    <div className="app">
      <h1>Welcome To YourDoctorsApp</h1>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h3>Here are all your choices</h3>
          <Select
            value={selectedDoctor}
            onChange={handleDoctorChange}
            options={transformedDoctors}
            placeholder="Select your doctor"
          />
          {renderErrorMessage("doctor")}
          <button onClick={() => props.onFormSwitch('choices')}>Previous</button>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

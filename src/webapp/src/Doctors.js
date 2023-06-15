import React, { useState } from "react";
import "./index.css";
import Select from 'react-select';

export const Doctors = (props) => {

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [errorMessages, setErrorMessages] = useState({});



    const handleSpecialtyChange = (option) => {
        setSelectedDoctor(option);
    };

    const doctors = [
        { value: 'option1', label: 'papadopoulos' },
        { value: 'option2', label: 'papapetrou' },
        { value: 'option3', label: 'oikonomoy' },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedDoctor==null) {
            setErrorMessages({name: "doctor", message: errors.doctor})
        }else{
            props.onFormSwitch('bookings');

        }

    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const errors = {
        doctor: "please select a doctor",
    };



    return (
        <div className="app">
            <h1>Welcome To YourDoctorsApp</h1>

            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h3>Here are all your choices</h3>
                    <Select
                        value={selectedDoctor}
                        onChange={handleSpecialtyChange}
                        options={doctors}
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

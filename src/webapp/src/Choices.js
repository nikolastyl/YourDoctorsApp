import React, { useState } from "react";
import "./index.css";
import Select from 'react-select';

export const Choices = (props) => {
    const specialties = [
        { value: 'option1', label: 'pediatrician' },
        { value: 'option2', label: 'dentist' },
        { value: 'option3', label: 'pathologist' },
    ];
    const areas = [
        { value: 'option1', label: 'athens' },
        { value: 'option2', label: 'patras' },
        { value: 'option3', label: 'kastritsi' },
    ];

    const [errorMessages, setErrorMessages] = useState({});
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedSpecialty==null){
            setErrorMessages({name:"specialty",message: errors.specialty})

        }else if (selectedArea==null){
            setErrorMessages({name:"area",message: errors.area})

        }else{
            props.onFormSwitch('doctors');

        }

    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const errors = {
        specialty: "please select a specialty",
        area: "please select an area"
    };


    const handleSpecialtyChange = (option) => {
        setSelectedSpecialty(option);
    };
    const handleAreaChange = (option) => {
        setSelectedArea(option);
    };

    return (
        <div className="app">
            <h1>Welcome To YourDoctorsApp</h1>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <h3>What specialty are you interested??</h3>
                        <Select
                            value={selectedSpecialty}
                            onChange={handleSpecialtyChange}
                            options={specialties}
                            placeholder="Select an option"
                        />
                        {renderErrorMessage("specialty")}
                        <br/>
                        <h3>In which area do you want to make an appointment?</h3>
                        <Select
                            value={selectedArea}
                            onChange={handleAreaChange}
                            options={areas}
                            placeholder="Select an option"/>
                        {renderErrorMessage("area")}

                        <button type="submit">Next</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

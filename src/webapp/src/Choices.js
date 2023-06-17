import React, { useState,useEffect } from "react";
import "./index.css";
import Select from 'react-select';
import axios from 'axios';


export const Choices = (props) => {
    
    const [specialties, setSpecialties] = useState([]);
    const [areas, setAreas] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);

    // Μετασχηματισμός των ειδικοτήτων
const transformedSpecialties = specialties.map(specialty => ({
    label: specialty,
    value: specialty
  }));
  
  // Μετασχηματισμός των περιοχών
  const transformedAreas = areas.map(area => ({
    label: area,
    value: area
  }));
  

    useEffect(() => {
        // Καλέστε την API για τη λήψη των ειδικοτήτων
        axios.get("/api/doctors/specialties")
          .then(response => {
            setSpecialties(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error("Σφάλμα κατά τη λήψη των ειδικοτήτων:", error);
          });
    
        // Καλέστε την API για τη λήψη των περιοχών
        axios.get("/api/doctors/areas")
          .then(response => {
            setAreas(response.data);
          })
          .catch(error => {
            console.error("Σφάλμα κατά τη λήψη των περιοχών:", error);
          });
      }, []);


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
                            options={transformedSpecialties}
                            placeholder="Select an option"
                        />
                        {renderErrorMessage("specialty")}
                        <br/>
                        <h3>In which area do you want to make an appointment?</h3>
                        <Select
                            value={selectedArea}
                            onChange={handleAreaChange}
                            options={transformedAreas}
                            placeholder="Select an option"/>
                        {renderErrorMessage("area")}

                        <button type="submit">Next</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

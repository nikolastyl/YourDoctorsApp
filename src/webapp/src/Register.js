import React, { useState} from "react";
import "./index.css";
import axios from 'axios';




export const Register = (props) => {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        var { amka, pass } = document.forms[0];

        const formData = {
            amka:amka.value,
            password:pass.value

        };

        if (!errors.amka.pattern.test(formData.amka)) {
            setErrorMessages({
              name: "amka",
              message: errors.amka.message
            });
            return;
          }

          

          axios.get(`/api/users/${formData.amka}`)
          .then(response => {
              if (response.data.exists) {
                  setErrorMessages({
                      name: "amka",
                      message: "User already exists"
                  });
              } else {
                  axios.post("/api/users/register", formData)
                      .then(response => {
                          console.log('Επιτυχής αποθήκευση δεδομένων:', response.data);
                          window.alert('Successful Register!');
                          props.onFormSwitch('choices',amka.value);
                      })
                      .catch(error => {
                          console.error('Σφάλμα κατά την αποθήκευση δεδομένων:', error);
                      });
              }
          })
          .catch(error => {
              console.error('Σφάλμα κατά την επικοινωνία με τον διακομιστή:', error);
          });
    }

    const errors = {
        amka: {
            pattern: /^\d{10}$/,
            message: "Invalid amka. It should contain exactly 10 digits."
          },
        pass: "invalid password"
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );



    return (
        <div className="app">
            <div className="login-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Amka </label>
                        <input type="text" name="amka" required />
                        {renderErrorMessage("amka")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required />
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button">
                        <div className="button-container">
                            <button onClick={handleSubmit}>Register</button>
                        </div>
                    </div>
                </form>
            </div>
            <br/><br/>
            <button onClick={() => props.onFormSwitch('login')}>Do you have already an account? Log in here.</button>
        </div>
    )
}

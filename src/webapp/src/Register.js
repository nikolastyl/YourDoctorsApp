import React, { useState} from "react";
import "./index.css";
import axios from 'axios';
import CircularJSON from 'circular-json';




export const Register = (props) => {

    const [pass, setPass] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        var { amka, pass } = document.forms[0];

        const formData = {
            amka:amka.value,
            password:pass.value

        };

        axios.post("/api/users", formData)

            .then(response => {
                console.log('Επιτυχής αποθήκευση δεδομένων:', response.data);
                // Εκτελέστε οποιεσδήποτε άλλες ενέργειες μετά την επιτυχή αποθήκευση
            })
            .catch(error => {
                console.error('Σφάλμα κατά την αποθήκευση δεδομένων:', error);
                // Εκτελέστε οποιεσδήποτε άλλες ενέργειες σε περίπτωση αποτυχίας
            });
    }

    const errors = {
        amka: "invalid amka",
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

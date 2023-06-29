import React, { useState } from "react";
import "./index.css";
import axios from 'axios';
import {Link} from "react-router-dom";



export const Login = (props) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);



    



    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        const { amka, pass } = document.forms[0];

        const formData = {
        amka: amka.value,
        password: pass.value
        };

        console.log(amka.value)

        //var { amka, pass } = document.forms[0];

        // Find user login info
        //const userData = database.find((user) => user.amka === amka.value);

        axios.post("/api/users/login", formData)
            .then(response => {
                console.log('Response:', response.data);
                if (response.data === "Successful Log in") {
                    setIsSubmitted(true);
                    alert('Successful Log in!');
                    console.log(amka.value)
                    props.onFormSwitch('choices',amka.value);
                } else {
                    setErrorMessages({ name: "pass", message: response.data });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            }); 


    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    const errors = {
        amka: "invalid amka",
        pass: "invalid password"
    };

    return (
        <div className="app">
            <div className="login-form">
                <h2>Log in</h2>
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
                            <button onClick={handleSubmit}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
            <br/><br/>
            <button onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>





    )
}
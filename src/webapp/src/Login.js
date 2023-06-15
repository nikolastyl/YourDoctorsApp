import React, { useState } from "react";
import "./index.css";
import {Link} from "react-router-dom";



export const Login = (props) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);



    // User Login info
    const database = [
        {
            amka: "user1",
            password: "pass1"
        },
        {
            amka: "user2",
            password: "pass2"
        }
    ];


    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { amka, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.amka === amka.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
                alert('Successful Log in!')
                props.onFormSwitch('choices');

            }
        } else {
            // Username not found
            setErrorMessages({ name: "amka", message: errors.amka });
        }


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
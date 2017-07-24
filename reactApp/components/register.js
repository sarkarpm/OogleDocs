import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    let input;
    let username;
    let password;
    let firstName;
    let lastName;
    return (
        <div className="container">
            <h1>Register</h1>
            <div>
                <input
                    type="text"
                    placeholder="First Name"
                    value={ firstName }
                    ref={ node => { input = node; } }
                    onChange={ () => firstName = input.value }
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={ lastName }
                    ref={ node => { input = node; } }
                    onChange={ () => lastName = input.value }
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={ username }
                    ref={ node => { input = node; } }
                    onChange={ () => username = input.value }
                />
            </div>
            <div>
                <input type="password"
                    placeholder="Password"
                    value={ password }
                    ref={ node => { input = node; } }
                    onChange={ () => password = input.value }
                />
            </div>
            <div>
                <button onClick={ () => {
                    // TODO: Create a mongo user and send it to the database
                } } value="Register" />
                <Link to="/login"> TEMP LINK </Link>
            </div>
        </div>
    );
};

export default Register;

import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    let input;
    let username;
    let password;
    return (
        <div className="container">
            <h1>Welcome to OogleDocs!</h1>
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
                    // TODO: Create post request to the database
                } }>Login</button>
                <Link to="/register">Register</Link>
                <Link to="/home">TEMP LINK</Link>
            </div>
        </div>
    );
};

export default Login;

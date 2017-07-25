import React from 'react';
import { Link } from 'react-router-dom';
var axios = require( 'axios' );  

const Login = (props) => {
    let input;
    let username;
    let password;
    return (
        <div className="container">
            <h1>Welcome to OogleDocs!</h1>
            <div>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={ username }
                    ref={ node => { input = node; } }
                    onChange={ () => username = input.value }
                />
            </div>
            <div>
                <input type="password"
                    id="password"
                    placeholder="Password"
                    value={ password }
                    ref={ node => { input = node; } }
                    onChange={ () => password = input.value }
                />
            </div>
            <div>
                <button onClick={ () => {
                   axios.post('http://localhost:3000/login', {
                        username: document.getElementById("username").value,
                        password: document.getElementById("password").value
                   })
                   .then(function(response){
                        console.log("RESPONSE", response.data);
                        if(response.data.success){
                            window.sessionStorage.setItem("userId", response.data.userId)
                            props.history.push("/home")
                        }
                        console.log("session id", window.sessionStorage.getItem('userId'))
                    })
                    .catch(function(err){
                        console.log("err", err);
                    })
                } }>Login</button>
                <Link to="/register">Register</Link>
                <Link to="/home">TEMP LINK</Link>
            </div>
        </div>
    );
};

export default Login;

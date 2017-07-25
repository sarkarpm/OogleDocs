import React from 'react';
import { Link } from 'react-router-dom';
var axios = require( 'axios' );  
// import User from '../../models'
// var models = require('../../models');
// var User = models.User;

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
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={ firstName }
                    ref={ node => { input = node; } }
                    onChange={ () => firstName = input.value }
                />
            </div>
            <div>
                <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={ lastName }
                    ref={ node => { input = node; } }
                    onChange={ () => lastName = input.value }
                />
            </div>
            <div>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={ username }
                    ref={ node => { input = node; } }
                    onChange={ () => username = input.value}
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
                    axios.post('http://localhost:3000/register', {
                        username: document.getElementById("username").value,
                        password: document.getElementById("password").value,
                        firstName: document.getElementById("firstName").value,
                        lastName: document.getElementById("lastName").value
                    })
                    .then(function(response){
                        console.log("RESPONSE", response);
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                    // var usr = new User({
                    //     documents: [],
                    //     username: username,
                    //     password: password,
                    //     firstName: firstName,
                    //     lastName: lastName
                    // })
                    // usr.save()
                } }>Register</button>
                <Link to="/login">Login</Link>
            </div>
            
        </div>
    );
};

export default Register;

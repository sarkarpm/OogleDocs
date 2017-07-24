import React, { Component, PropTypes } from 'react';
//import { Link, Route } from 'react-router-dom';

const LoginScreen = () => {
	let input;
	let username;
	let password;
	return (
		<div className="container" style={{display: 'flex', flexDirection: 'column', backgroundColor: '#a1dded'}}>
		<h1 style={{display: 'flex', justifyContent: 'center'}}>Welcome to GoogleDocs!</h1>
		<div style={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
		<input
        type="text"
				placeholder="Username"
                value={username}
                ref={node => {input = node;}}
                onChange={() => username = input.value }
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
    	<input type="password"
    			placeholder="Password"
                value={password}
                ref={node => {input = node;}}
                onChange={() => password = input.value }
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
     	<input type="submit" onClick={() => {
                //create MongoUser
            }} value="Login"/>
        <input type="submit" onClick={() => { 
                //create MongoUser
            }} value="Register"/>

        </div>
        </div>
    );
}

const RegisterScreen = () => {
    let input;
    let username;
    let password;
    let firstName;
    let lastName;
    return (
        <div className="container" style={{display: 'flex', flexDirection: 'column', backgroundColor: '#a1dded'}}>
        <h1 style={{display: 'flex', justifyContent: 'center'}}>Register</h1>        
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
        <input
        type="text"
                placeholder="First Name"
                value={firstName}
                ref={node => {input = node;}}
                onChange={() => firstName = input.value }
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
        <input
        type="text"
                placeholder="Last Name"
                value={lastName}
                ref={node => {input = node;}}
                onChange={() => lastName = input.value }
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
        <input
        type="text"
                placeholder="Username"
                value={username}
                ref={node => {input = node;}}
                onChange={() => username = input.value }
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
        <input type="password"
                placeholder="Password"
                value={password}
                ref={node => {input = node;}}
                onChange={() => password = input.value }
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <input type="submit" onClick={() => { 
                //create MongoUser, reRoute to Login page
            }} value="Register"/>

        </div>
        </div>
    );
}


export default RegisterScreen
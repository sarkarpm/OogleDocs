import React from 'react';
import { Button, Input, Form } from 'reactstrap';
var axios = require( 'axios' );

const Register = ( props ) => {
    const register = () => {
        axios.post( 'http://localhost:3000/register', {
            username: document.getElementById( "username" ).value,
            password: document.getElementById( "password" ).value,
            firstName: document.getElementById( "firstName" ).value,
            lastName: document.getElementById( "lastName" ).value
        } )
            .then( function ( response ) {
                console.log( "RESPONSE", response );
                props.history.push( '/login' );
            } )
            .catch( function ( err ) {
                console.log( err );
            } );
    };

    return (
        <div>
            <h1>Register</h1>
            <Form>
                <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                />
                <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                />
                <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                />
                <Input type="password"
                    id="password"
                    placeholder="Password"
                />
            </Form>
            <Button onClick={ register }>Register</Button>
            <Button href="#/login">Login</Button>
        </div>
    );
};

export default Register;

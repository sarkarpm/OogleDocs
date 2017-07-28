import React from 'react';
import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap';
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
            <div className="form">
                <ListGroup>
                    <ListGroupItem>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                        />
                    </ListGroupItem>
                    <ListGroupItem>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                        />
                    </ListGroupItem>
                    <ListGroupItem>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </ListGroupItem>
                    <ListGroupItem>
                        <Input type="password"
                            id="password"
                            placeholder="Password"
                        />
                    </ListGroupItem>
                </ListGroup>
            </div>
            <div className="buttonLine">
                <Button onClick={ register }>Register</Button>
                <Button href="#/login">Login</Button>
            </div>
        </div>
    );
};

export default Register;

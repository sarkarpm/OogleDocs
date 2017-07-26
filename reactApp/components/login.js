import React from 'react';
import { Button, Input, Form } from 'reactstrap';
var axios = require( 'axios' );

const Login = ( props ) => {
    const login = () => {
        axios.post( 'http://localhost:3000/login', {
            username: document.getElementById( "username" ).value,
            password: document.getElementById( "password" ).value
        } )
            .then( function ( response ) {
                console.log( "RESPONSE", response.data );
                if ( response.data.success ) {
                    window.sessionStorage.setItem( "userId", response.data.userId );
                    props.history.push( "/home" );
                }
                console.log( "session id", window.sessionStorage.getItem( 'userId' ) );
            } )
            .catch( function ( err ) {
                console.log( "err", err );
            } );
    };

    return (
        <div>
            <h1>Welcome to OogleDocs!</h1>
            <Form>
                <Input
                    type="text"
                    id="username"
                    placeholder="Username"
                />
                <Input type="password"
                    id="password"
                    placeholder="Password"
                />
            </Form>
            <Button onClick={login}>Login</Button>
            <Button href="#/register">Register</Button>
        </div>
    );
};

export default Login;

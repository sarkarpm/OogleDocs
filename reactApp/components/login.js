import React from 'react';
import { Button, Input, Form } from 'reactstrap';
var axios = require( 'axios' );

const Login = ( props ) => {
    const login = () => {
        const username = document.getElementById( "username" ).value;
        const password = document.getElementById( "password" ).value;
        axios.post( 'http://localhost:3000/login', {
            username,
            password
        } )
            .then( function ( response ) {
                if ( response.data.success ) {
                    window.sessionStorage.setItem( "userId", response.data.userId );
                    props.history.push( "/home" );
                    props.socket.emit('login', JSON.stringify({username, userId: response.data.userId }));
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

import React from 'react';
import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap';
var axios = require( 'axios' );

const Login = ( props ) => {
    const login = () => {
        console.log( 'props', props );
        const username = document.getElementById( "username" ).value;
        const password = document.getElementById( "password" ).value;
        axios.post( 'http://localhost:3000/login', {
            username,
            password
        } )
            .then( function ( response ) {
                console.log( "RESPONSE", response.data );
                if ( response.data.success ) {
                    window.sessionStorage.setItem( "userId", response.data.userId );
                    props.history.push( "/home" );
                    props.socket.emit( 'login', JSON.stringify( { username, userId: response.data.userId } ) );
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
            <div className="form">
                <ListGroup>
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
                <Button onClick={ login }>Login</Button>
                <Button href="#/register">Register</Button>
            </div>
        </div>
    );
};

export default Login;

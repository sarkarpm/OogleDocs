import React from 'react';
import { Button, Input, Form } from 'reactstrap';

const Login = () => {
    return (
        <div>
            <h1>Welcome to OogleDocs!</h1>
            <Form>
                    <Input
                        type="text"
                        placeholder="Username"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                    />
                <Button href="#/home" onClick={ () => {
                    // TODO: Create post request to the database and remove href
                } }>Login</Button>
            </Form>
            <Button href="#/register">Register</Button>
        </div>
    );
};

export default Login;

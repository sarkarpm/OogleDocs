import React from 'react';
import { Button, Input } from 'reactstrap';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <div>
                <Input
                    type="text"
                    placeholder="First Name"
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                />
                <Input
                    type="text"
                    placeholder="Username"
                />
                <Input
                    type="password"
                    placeholder="Password"
                />
                <Button onClick={ () => {
                    // TODO: Create a mongo user and send it to the database
                } }>Register</Button>
            </div>
            <div>
                <Button href="#/login">Login</Button>
            </div>
        </div>
    );
};

export default Register;

import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import DocEdit from './docEdit';
import Home from './home';
import Login from './login';
import Register from './register';
import io from 'socket.io-client';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: io('http://localhost:3000')
        };
    }

    componentDidMount() {
        this.state.socket.on('connect', () => {
            console.log('connected');
        });

        this.state.socket.on('errorMessage', message => {
            alert(message);
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/edit/:docid' render={ (props) => <DocEdit socket={this.state.socket} {...props}/> }  />
                    <Route path='/home' render={ (props) => <Home socket={this.state.socket} {...props}/> }  />
                    <Route path='/login' render={ (props) => <Login socket={this.state.socket} {...props}/> }  />
                    <Route path='/register' component={ Register } />
                    <Route path='/' render={ () => <Redirect to='/login' /> } />
                </Switch>
            </Router>
        );
    }
}



export default App;

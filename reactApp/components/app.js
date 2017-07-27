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
import History from './history';
import io from 'socket.io-client';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io('http://localhost:3000');
    }

    componentDidMount() {
        this.socket.on('login', (msg) => {
            console.log(msg);
        });
        //
        // session.clearCache(cb => {
        //     console.log('cache cleared');
        // });
        //
        // session.clearStorageData(cb => {
        //     console.log('storage data cleared');
        // });

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/edit/:docid' render={ (props) => <DocEdit socket={this.socket} {...props}/> }  />
                    <Route path='/history/:docid' render={ (props) => <History socket={this.socket} {...props}/> }  />
                    <Route path='/home' render={ (props) => <Home socket={this.socket} {...props}/> }  />
                    <Route path='/login' render={ (props) => <Login socket={this.socket} {...props}/> }  />
                    <Route path='/register' component={ Register } />
                    <Route path='/' render={ () => <Redirect to='/login' /> } />
                </Switch>
            </Router>
        );
    }
}



export default App;

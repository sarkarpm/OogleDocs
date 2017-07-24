import React from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import Editor from './editor';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <Link to="/home">Hello</Link>
            </div>
        );
    }
}
class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <Link to="/edit/_id_goes_here_">Hello</Link>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/edit/:docid' component={ Editor } />
                    <Route path='/home' component={ Home } />
                    <Route path='/' component={ Login } />
                </Switch>
            </Router>
        );
    }
}

export default App;

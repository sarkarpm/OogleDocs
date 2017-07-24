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

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/edit/:docid' component={ DocEdit } />
                    <Route path='/home' component={ Home } />
                    <Route path='/login' component={ Login } />
                    <Route path='/register' component={ Register } />
                    <Route path='/' render={ () => <Redirect to='/login' /> } />
                </Switch>
            </Router>
        );
    }
}

export default App;

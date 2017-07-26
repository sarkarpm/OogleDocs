import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './style.css';

import App from './components/app' ;

// fetch('http://localhost:3000/save')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})


ReactDOM.render( <App />,
    document.getElementById( 'root' ) );

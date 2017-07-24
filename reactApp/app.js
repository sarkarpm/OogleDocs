var React = require('react');
var ReactDOM = require('react-dom');
import RegisterScreen from './homeScreen';
import MyEditor from './components/MyEditor';
import './style.css'

/* This can check if your electron app can communicate with your backend */
fetch('http://localhost:3000')
.then(resp => resp.text())
.then(text => console.log(text))
.catch(err => {throw err})

ReactDOM.render(<MyEditor />,
   document.getElementById('root'));

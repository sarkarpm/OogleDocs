const express = require( 'express' );
var bodyParser = require( 'body-parser' );
const app = express();

//handles sockets
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketHandler = require('./socketHandler').socketHandler;
socketHandler(io);

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

//handles serialize, deserialize, local strategy
const passportHelper = require('./passportHelper').passportHelper;
passportHelper(app);

//handles login, register, logout
const authenticationHelper = require('./authenticationHelper').authenticationHelper;
authenticationHelper(app);

const documentHelper = require ('./documentHelper').documentHelper;
documentHelper(app);


server.listen(3000, () => {
    'Server listening on port 3000!';
});

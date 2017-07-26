var passport = require( 'passport' );
var User = require( './models' ).User;

function authenticationHelper( app ) {
  //redirect to documents pages
    app.post( '/login', passport.authenticate( 'local' ), function ( req, res ) {
        res.json( { success: true, userId: req.user._id } );
    } );

    app.post( '/register', function ( req, res ) {
        var usr = new User( {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            documents: []
        } );
        usr.save();
        res.send( {} );
    } );

    app.get( '/logout', function ( req, res ) {
        req.logout();
    } );

    app.get( '/', function ( req, res ) {
        res.send('hi');
    } );
}

module.exports = {
    authenticationHelper
};

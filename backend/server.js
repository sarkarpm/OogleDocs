const express = require( 'express' );
var bodyParser = require( 'body-parser' );
var passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' );
var User = require( '../models' ).User;
var Document = require( '../models' ).Document;

const app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

//Example route
passport.serializeUser( function ( user, done ) {
    done( null, user._id );
} );

passport.deserializeUser( function ( id, done ) {
    User.findById( id, function ( err, user ) {
        done( err, user );
    } );
} );

app.use( passport.initialize() );
app.use( passport.session() );

// passport strategy
passport.use( new LocalStrategy( function ( username, password, done ) {
    // Find the user with the given username
    console.log( "password", password );
    User.findOne( { username: username }, function ( err, user ) {
        // if there's an error, finish trying to authenticate (auth failed)
        if ( err ) {
            console.log( err );
            return done( err );
        }
        // if no user present, auth failed
        if ( !user ) {
            console.log( user );
            return done( null, false, { message: 'Incorrect username.' } );
        }
        // if passwords do not match, auth failed
        if ( user.password !== password ) {
            console.log( "wrongpassword", user );
            return done( null, false, { message: 'Incorrect password.' } );
        }
        console.log( "rightone", user );
        // auth has has succeeded
        return done( null, user );
    } );
}
) );

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

app.post( '/newdoc', function ( req, res ) {
    var doc = new Document( {
        title: req.body.title,
        password: req.body.password,
        contentState: {}
    } );
    doc.save();
    User.findById( req.body.userId )
        .then( user => {
            user.documents.push( doc.id );
            user.save();
        } );
    res.json( { resId: doc._id } );
} );
app.post( '/joindoc', function ( req, res ) {
    Document.findById( req.body.docId )
        .then( doc => {
            if ( req.body.password === doc.password ) {
                User.findById( req.body.userId )
                    .then( user => {
                        user.documents.push( doc._id );
                        user.save();
                    } );
                res.json( { success: true, resId: doc._id } );
            } else {
                res.json( { success: false });
            }
        } );
} );

app.post( '/doclist', function ( req, res ) {
    User.findById( req.body.UId )
        .then( user => {
            var docmap = user.documents.map( id => {
                return Document.findById( id );
            } );
            Promise.all( docmap ).then( val => {
                console.log( 'THESE ARE VALS', val );
                res.json( { success: true, val } );
            } );
        } );
} );

app.post('/save', function(req, res){
    Document.findById(req.body.docId)
        .then( doc => {
            doc.contentState = req.body.contentState;
            doc.save();
        })
})

app.post('/loadDocument', function(req, res){
    Document.findById(req.body.docId)
        .then( doc => {
            res.json( {success: true, doc})
        })
})

app.get( '/logout', function ( req, res ) {
    req.logout();
} );

app.listen( 3000, function () {
    console.log( 'Backend server for Electron App running on port 3000!' );
} );

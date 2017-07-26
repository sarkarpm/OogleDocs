var User = require( './models' ).User;
var Document = require( './models' ).Document;

function documentHelper( app ) {

    app.post( '/newdoc', function ( req, res ) {
        var doc = new Document( {
            title: req.body.title,
            password: req.body.password,
            contentState: []
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
                    res.json( { success: false } );
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
                    res.json( { success: true, val } );
                } );
            } );
    } );

    app.post( '/historylist', function ( req, res ) {
        Document.findById( req.body.docId )
            .then( doc => {
                if ( doc ) {
                    res.json( { success: true, history: doc.contentState, title: doc.title } );
                } else {
                    res.json( { success: false } );
                }
            } );
    } );

    app.post( '/save', function ( req, res ) {
        Document.findById( req.body.docId )
            .then( doc => {
                doc.contentState.push( req.body.contentState );
                doc.save();
                console.log('DOC WAS SAVED', doc)
            } )
            .catch( err => {
                console.log( 'error saving document in server', err );
            } );
    } );

    app.post( '/loadDocument', function ( req, res ) {
        Document.findById( req.body.docId )
            .then( doc => {
                res.json( { success: true, doc } );
            } )
            .catch( err => {
                console.log( 'error loading document from server', console.log( err ) );
            } );
    } );
}

module.exports = {
    documentHelper
};

const express = require( 'express' );
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models').User;

var Route = require('react-router-dom').Route;
var Redirect = require('react-router-dom').Redirect;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Example route
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

// passport strategy
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  	console.log("password", password)
    User.findOne({ username: username }, function (err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) { 
        console.log(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if passwords do not match, auth failed
      if (user.password !== password) {
      	console.log("wrongpassword", user);
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("rightone", user);
      // auth has has succeeded
      return done(null, user);
    });
  }
));

app.get("/login", function(req, res){
	//console.log("get login req", req)
})

//redirect to documents pages
app.post('/login', passport.authenticate('local'), function(req, res){
	//console.log("PRIYAYAYYAA")
	
	res.json({success: true, userId: req.user._id})
		//res.send()
	
});

app.post('/register', function(req, res){
	var usr = new User({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName, 
		documents: []
	})
	usr.save()
	//console.log("post req", req.body)
})

app.listen( 3000, function () {
    console.log( 'Backend server for Electron App running on port 3000!' );
} );

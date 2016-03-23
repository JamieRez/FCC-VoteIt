'use strict';
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
app.set('port', (process.env.PORT ));

var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport.js')(passport);

app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes/index.js')(express,app,passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(app.get('port'));
console.log('The magic happens on port ' + app.get('port'));
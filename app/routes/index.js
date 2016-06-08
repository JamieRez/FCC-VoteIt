'use strict';

var path = process.cwd();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8080;
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var configDB = require('../../config/database.js');
var jade = require('jade');
var Poll = require('../models/poll.js');
var currentPollNum = 1;


mongoose.connect(configDB.url, function(){
    console.log('database connected');
});

require('../../config/passport.js')(passport);

app.use(bodyParser());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); 

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(express.static('./public'));
app.use(express.static('./views'));
app.use(express.static('./node_modules/chart.js/src'));



	app.route('/').get(function (req, res) {
			res.render(path + '/views/index.jade', {user : req.user});
	});
	
	app.route('/signup').get(function (req, res) {
		res.sendFile(path + '/views/signup.html');
		
	});
	
	app.route('/polls').get(function (req, res) {
		var polls = Poll.getPolls();
		res.render(path + '/views/polls.jade', {Polls: polls, user : req.user});
	});
	
	app.route('/myPolls').get(function (req, res) {
		Poll.getUserPolls(req.user.local.email , function(userPolls){
			res.render(path + '/views/myPolls.jade', {user : req.user , polls : userPolls});
		});
	});
	
	app.route('/createPoll').get(function (req, res) {
		res.render(path + '/views/createPoll.jade', {user : req.user});
	});
	
	app.route('/login').get(function (req, res) {
		res.sendFile(path + '/views/login.html');
	});
	
	app.route('/delete').get(function(req,res){
		Poll.deleter();
	});
	
	app.route('/poll/:num').get(function(req,res){
		Poll.getPollFromNum(req.params.num, function(pollFromNum){
			currentPollNum = req.params.num;
			res.render(path + '/views/votePage.jade' , {user : req.user , Poll : pollFromNum});
		});
	});
	
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/polls', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/polls', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.post('/createPoll', function(req, res){
    	Poll.create(req.body.question, req.body.choice, req.user.local.email);
    	res.redirect('polls');
    });
    
    app.post('/poll/:num', function(req,res){
    	var voted = true;
    	Poll.getPollFromNum(currentPollNum, function(pollFromNum){
    		Poll.addVote(pollFromNum , req.body.choice_id , false ,function(updatedPoll){
    			res.render(path + '/views/votePage.jade' , {user : req.user , Poll : updatedPoll , voted : voted});
    		});
    	});
    });
    
    app.post('/poll/createChoice/:num' , function(req,res){
    	var voted = true;
    	Poll.getPollFromNum(currentPollNum, function(pollFromNum){
    		Poll.addVote(pollFromNum , false, req.body.NewChoice , function(updatedPoll){
    			res.render(path + '/views/votePage.jade' , {user : req.user, Poll : updatedPoll, voted : voted});
    		});
    	});
    });
    
    app.post('/deletePoll/:num', function(req,res){
    	Poll.deletePoll(req.params.num, function(){
    		res.redirect('/myPolls');
    	}); 
    });
  
	
	
	app.listen(port, function(){
		console.log('Listening on port ' + port);
	})

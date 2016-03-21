'use strict';

var path = process.cwd();
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static('./public/css'));
app.use(express.static('./public/views'));

	app.route('/').get(function (req, res) {
		res.sendFile(path + '/public/views/index.html');
		
	});
	
	app.route('/signup').get(function (req, res) {
		res.sendFile(path + '/public/views/signup.html');
		
	});
	
	app.route('/polls').get(function (req, res) {
		res.sendFile(path + '/public/views/polls.html');
		
	});
	
	app.route('/login').get(function (req, res) {
		res.sendFile(path + '/public/views/login.html');
		
	});
	
	app.post('/signupSubmit' , function(req,res){
		console.log(res);
	})
		

	app.listen(app.get('port'), function(req,res){
    	console.log("Listening on port " + app.get('port'));
	});
'use strict';

var path = process.cwd();
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static('./public/css'));

	app.route('/').get(function (req, res) {
		res.sendFile(path + '/public/index.html');
		
	});
		

	app.listen(app.get('port'), function(req,res){
    	console.log("Listening on port " + app.get('port'));
	});
'use strict';

var path = process.cwd();
var express = require('express');
var multer = require('multer');
var app = express();
var upload = multer().single('file');


	app.route('/').get(function (req, res) {
		res.sendFile(path + '/public/index.html');
	});
		
	app.post('/upload',function(req, res){
  		upload(req,res, function(err){
  			if(err) throw err;
  			res.json({Filesize : req.file.size + ' bytes'});
  		});
	});



app.listen(8080, function(req,res){
    console.log("Listening on port 8080");
});
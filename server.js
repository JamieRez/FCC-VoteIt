var express = require('express');
var path = process.cwd();
var app = express();
var port = 8080;
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var User = require('./app/models/user.js')





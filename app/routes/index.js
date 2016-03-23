'use strict';

var path = process.cwd();


module.exports = function(express,app, passport){

app.set('port', (process.env.PORT || 8080));

app.use(express.static('./public/css'));
app.use(express.static('./views'));




	app.route('/').get(function (req, res) {
		res.sendFile(path + '/views/index.html');
		
	});
	
	app.route('/signup').get(function (req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
		
	});
	
	app.route('/polls').get(function (req, res) {
		res.sendFile(path + '/views/polls.html');
		
	});
	
	app.route('/login').get(function (req, res) {
		res.sendFile(path + '/views/login.html');
		
	});
	
	 app.post('/signup', passport.authenticate('local-signup', {
        successRedirect :'/', // redirect to the secure profile section
        failureRedirect :'/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	
		
	function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

};

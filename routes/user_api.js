var express = require('express');
var router = express.Router();

var m = require('../model/user_functions');

router.get('/', function(req, res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else
	res.render('users_template/user_page', { userinfo   : user});
});

router.get('/add', function(req, res) {
	if (user === undefined || user.role !=='global_admin') {
			req.flash('auth', 'Not logged in!');
			res.redirect('/login');
	}
	else {
		// render add view. TODO: update this line when the view is implemented
		res.render('users_template/user_page');
	}
});

router.post('/add', function(req,res) {
	var user = req.session.user;
	  if (user === undefined || user.role !=='global_admin') {
			req.flash('auth', 'Not logged in!');
	  	res.redirect('/login');
		}
		else {
			// call db function for create user
			// Parameters: (String) firstName, (String) lastName, (String) username,
			// (String) password, (String) email, (Number) role
			var firstName = req.body.firstName;
			var lastName = req.body.lastName;
			var username = req.body.username;
			var password = req.body.password;
			if(password.length < 6) {
				console.log("Password isn't long enough.");
				//res.flash <-- do this, similar to above
				res.redirect('/login');
			}
			var email = req.body.email;
			var role = req.body.role;
				db.createUser(firstName, lastName, username, password, email, role, function(err){
					if(err){
						console.log(err.getDescription);
					}
					else{}
				});
		}
});

router.get('/edit/:id', function(req, res) {
	if (user === undefined || user.role !=='global_admin') {
		req.flash('auth', 'Not logged in!');
		res.redirect('/login');
	}
	else {
		// render add view. TODO: update this line when the view is implemented
		res.render('users_template/user_page');
	}
});

router.post('/edit/:id', function(req, res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else {
		// update email and password
		db.updateEmail(req.body.username, req.body.email, function(error){
			console.log(error);
		});
		db.updatePassword(req.body.username, req.body.password, function(error){
			console.log(error);
		});
	}
});

router.post('/delete/:userid', function(req,res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else {
		console.log("Deleting user.");
		db.deleteUser(req.body.username, function(error){
			console.log(error.getDescription);
		});
	}
});


module.exports = router;

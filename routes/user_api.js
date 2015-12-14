var express = require('express');
var router = express.Router();
var db = require('../database/usersAPI');
var m = require('../model/user_functions');

//TODO: update a few of these 'render' calls when more views are added.
// especially for add and edit

router.get('/', function(req, res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else
	res.render('users_template/user_page', { userinfo   : user});
});

router.get('/manage', function(req, res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else {
		// will need to call a db function here that returns the 'data' array of users
		res.render('users_template/user_list', { userinfo : user});
	}
});

router.get('/add', function(req, res) {
	var user = req.session.user;
	console.log(user);
	if (user === undefined) {
			req.flash('auth', 'You are not logged in.');
			res.redirect('/#login');
	}
	else if (user.role === 2 || user.role === 3) {
		req.flash('auth', 'You do not have permission.');
		res.redirect('/#login');
	}
	else {
		res.render('users_template/add_user', { userinfo   : user});
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
				res.flash('auth', 'Password must be at least 6 characters');
				res.redirect('/add');
			}
			var email = req.body.email;
			var role = req.body.role;
				db.createUser(firstName, lastName, username, password, email, role, function(err){
					if(err){
						console.log(err.getDescription);
					}
					else{
						console.log(user);
					}
				});
		}
});

router.get('/edit/:id', function(req, res) {
	var user = req.session.user;
	if (user === undefined || user.role !=='global_admin') {
		req.flash('auth', 'Not logged in!');
		res.redirect('/login');
	}
	else {
		// render add view. TODO: update this line when the view is implemented
		res.render('users_template/user_page', { userinfo   : user});
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

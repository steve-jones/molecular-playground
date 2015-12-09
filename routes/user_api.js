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

router.post('/createuser', function(req,res) {
	var user = req.session.user;
	  	if (user === undefined || user.role !=='global_admin') {
		    	req.flash('auth', 'Not logged in!');
	    		res.redirect('/login');
		}
		else {
			// call db function for create user
			// Parameters: (String) firstName, (String) lastName, (String) username,
			// (String) password, (String) email, (Number) role
			// TODO: verify password length and such
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

router.post('/edit/:userid', function(req, res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else {
		/** Check which field(s) of user info have changed, then call appropriate
		* 	db functions to update that info. Verify password length and all that
		*		too.
		*/
	}
});


router.post('/disable/:userid', function(req,res) {
	// what's the difference between this and /delete?
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else{}
});

router.post('/delete/:userid', function(req,res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else{}
});


module.exports = router;

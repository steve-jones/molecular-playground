var express = require('express');
var router = express.Router();
var model = require('../model/auth');
var db = require('../database/usersAPI.js');

// Homepage
router.get('/', function(req, res) {
	var user = req.session.user;
	  	if (user === undefined) {
      			res.render('home_page', { message: req.flash('auth')});
		}
		else{
      			res.render('loggedin_page', { userinfo   : user});
		}
});

//login
router.post('/login', function (req, res) {
  var post = req.body;
	//next step: get user from database if credentials are good
  if (post.user === 'john' && post.password === 'johnspassword') {
    req.session.user = 'johns_user_id_here';
    res.render('loggedin_page', {userinfo:"joijoiji"});
		console.log(post.user);
		console.log(post.password);
  } else {
	req.flash('auth', 'Login incorrect');
     res.redirect('/#login');
  }
});

//The logout route:
router.get('/logout', function(req,res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

// About page
router.get('/about', function(req, res) {
	var user_obj = req.session.user;
	res.render('about', { userinfo   : user_obj});
});


module.exports = router;

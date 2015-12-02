var express = require('express');
var router = express.Router();
var model = require('../model/auth');
var db = require('../database/usersAPI.js');

// Homepage
router.get('/', function(req, res) {

	var user_obj = req.session.user_id;
      	    		res.render('home_page', { userinfo   : user_obj, testdata: 'testing'});


});


// Login page
router.post('/login', function (req, res) {
  var post = req.body;
	//next step: get user from database if credentials are good
  if (post.user === 'john' && post.password === 'johnspassword') {
    req.session.user_id = 'johns_user_id_here';
    res.redirect('/');
  } else {
    res.render('home_page', {userinfo:"joijoiji"});
		console.log(post.user);
		console.log(post.password);
  }
});

//The logout route:
router.post('/logout', function (req, res) {
  delete req.session;
  res.redirect('/');
});

// About page
router.get('/about', function(req, res) {
	var user_obj = req.session.user;
	res.render('about', { userinfo   : user_obj});
});


module.exports = router;

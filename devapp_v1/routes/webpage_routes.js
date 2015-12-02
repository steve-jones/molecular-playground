var express = require('express');
var router = express.Router();
var model = require('../model/auth');

// Homepage
router.get('/', function(req, res) {

	var user_obj = req.session.user;
      	    		res.render('home_page', { userinfo   : user_obj, testdata: 'testing'});


});


// Login page
router.post('/login', function (req, res) {
  var post = req.body;
  if (post.user === 'john' && post.password === 'johnspassword') {
    req.session.user_id = 'johns_user_id_here';
    res.redirect('/');
  } else {
    res.render('home_page', {userinfo:"joijoiji"});
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

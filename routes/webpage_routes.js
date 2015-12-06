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

//single sign on for testing
router.get('/sso', function(req, res) {
	var user = 'global_admin';
      	res.render('loggedin_page', { userinfo   : { id: 5,
  firstname: 'matt',
  lastname: 'lydigsen',
  uname: 'mlydigsen',
  password: '12345',
  email: 'mlydigsen@umass.edu',
  role: 1 }
});
});

//login
router.post('/login', function (req, res) {
  var post = req.body;
	//next step: get user from database if credentials are good
  db.getUser(body.user, function (data) {
	console.log(data);

    if (data === null){
      req.flash('auth', 'Login incorrect');
      res.redirect('/#login');
    }
    req.session.user = data;
    res.render('loggedin_page', {userinfo:data});
  });

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

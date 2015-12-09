var express = require('express');
var router = express.Router();
var model = require('../model/auth');
var db = require('../database/usersAPI.js');

// Homepage
router.get('/', function(req, res) {
	var user = req.session.user;
	  	if (user === undefined) {
      			res.render('home_page', { userinfo   : user,message: req.flash('auth')});
		}
		else{
      			res.render('loggedin_page', { userinfo   : user});
		}
});

// route to render the google map
router.get('/map', function(req, res) {
	var user = req.session.user;
	res.render('partials_template/map')
});

//single sign on for testing
router.get('/sso', function(req, res) {
	var user = 'global_admin';
  var data ={ id: 1,
  firstname: 'super user',
  lastname: 'person',
  uname: 'superuser',
  password: '12345',
  email: 'superuser@umass.edu',
  role: 1 }

  req.session.user = data;

      	res.render('loggedin_page', { userinfo   : data});
});

//login
router.post('/login', function (req, res) {
 var post = req.body;
  //next step: get user from database if credentials are good

  db.getUser(post.user, function (data) {
   console.log("user data :"+ data);
    if (data === undefined){
      req.flash('auth', 'User does not exist');
      res.redirect('/#login');
    }
    else if (data.password !=  post.password){
      req.flash('auth', 'Login password');
      res.redirect('/#login');
    }
    else{
      //success
    req.session.user = data;
    res.render('loggedin_page', {userinfo:data});
    }
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

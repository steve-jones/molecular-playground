var express = require('express');
var router = express.Router();
var model = require('../model/auth');
var db = require('../database/usersAPI.js');

// Homepage
router.get('/', function(req, res) {
	var user = req.session.user;
	  	if (user === undefined) {
<<<<<<< HEAD
      			res.render('home_page', { message: req.flash('auth')});
=======
      			res.render('home_page', { userinfo   : user,message: req.flash('auth')});
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
		}
		else{
      			res.render('loggedin_page', { userinfo   : user});
		}
});

//single sign on for testing
router.get('/sso', function(req, res) {
	var user = 'global_admin';
<<<<<<< HEAD
      	res.render('loggedin_page', { userinfo   : { id: 0,
=======
  var data ={ id: 1,
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
  firstname: 'super user',
  lastname: 'person',
  uname: 'superuser',
  password: '12345',
  email: 'superuser@umass.edu',
  role: 1 }
<<<<<<< HEAD
});
=======

  req.session.user = data;

      	res.render('loggedin_page', { userinfo   : data});
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
});

//login
router.post('/login', function (req, res) {
 var post = req.body;
  //next step: get user from database if credentials are good

  db.getUser(post.user, function (data) {
<<<<<<< HEAD
   console.log(data);
=======
   console.log("user data :"+ data);
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
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

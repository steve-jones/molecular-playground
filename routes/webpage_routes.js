var express = require('express');
var router = express.Router();

var db = require('../database/usersAPI.js');

// Homepage
router.get('/', function(req, res) {
	var user = req.session.user;
	console.log(user);
	  	if (user === undefined || user ===null) {
      			res.render('home_page', { userinfo   : user,message: req.flash('auth')});
		}
		else{
			if (user.role ===0) {
      			res.render('control_panel', { userinfo   : user});
			}
			if (user.role ===3) {
      			res.render('author_panel', { userinfo   : user});
		  }
      else{//others not implmeneted
            res.render('control_panel', { userinfo   : user});
      }
    }
});

// route to render the google map
router.get('/map', function(req, res) {
	var user = req.session.user;
	res.render('partials_template/map')
});

//single sign on for testing
//in the future use google/aws Oauth2
router.get('/sso', function(req, res) {

  var data ={ id: 1,
  firstname: 'super user',
  lastname: 'person',
  uname: 'superuser',
  password: '12345',
  email: 'superuser@umass.edu',
  role: 0,
  role_description: 'Global Admin'}

  req.session.user = data;

  res.render('control_panel', { userinfo   : data});
});

//login
router.post('/login', function (req, res) {
 var post = req.body;
  //next step: get user from database if credentials are good

  db.getUser(post.user, function (data, userRole) {
   console.log("user data :"+ data);
    if (data === undefined || data == null){
      req.flash('auth', 'User does not exist');
      res.redirect('/#login');
    }
    else if (data.password !=  post.password){
      req.flash('auth', 'Login password');
      res.redirect('/#login');
    }
    else{
      //success
      console.log(data)
    	req.session.user = data;
  	  req.session.user.role_description= userRole.getDescription();
        res.redirect('/');
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
router.post('/signup', function(req, res) {
	var user_obj = req.session.user;
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
            req.flash('auth', 'Password isn\'t long enough.');
        res.redirect('/#signup');
      }
      var email = req.body.email;
      var role = req.body.role;
        console.log("before")
        db.createUser(firstName, lastName, username, password, email, role, function(err){
          console.log("heey")
          if(err){
            console.log(err.getDescription);
          }
          else{
            console.log(err);
                req.flash('auth', 'create success');
            res.redirect('/#login');
          }
        });
});


module.exports = router;

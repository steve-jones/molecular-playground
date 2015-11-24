var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

//typing in the name of site will bring you to login page
router.get('/', function(req, res){
  res.redirect('/login');
});

router.get('/home', function(req, res){
  res.redirect('/login');
});

router.get('/login', function(req, res) {
   var message = req.flash('auth') || '';
   var user = req.session.user;
     if(user !== undefined){
       res.redirect('/users/home');
     }
     else{
       res.sendFile('signin.html', { root: "public/views" });
     }
   
});

router.get('/signup', function(req, res) {
  var message = req.flash('auth') || '';
   var user = req.session.user;
     if(user !== undefined){
       res.redirect('/users/home');
     }
     else{
       res.sendFile('signup.html', { root: "public/views" });
     }
});

router.get('/logout', function(req, res){
  var user = req.session.user;
     if(user !== undefined){
       delete req.session.user;
       res.redirect('/login');
     }
     else{
       req.flash('auth', 'Not logged in!');
       res.redirect('/login');
     }

});

router.post('/login/auth', function(req, res){

  console.log("ROUTER AUTH:\n"+req.body.name);
  console.log(req.body.password);

   if(req.body.name === "" || req.body.password === "" ||
      req.body.name === undefined ||
      req.body.password === undefined){
     res.json({"code":"0"});
   }

   else{
     userlib.isUser(req.body.name, function(err, user){
	if(err === undefined){
	  if(req.body.password === user.password){
	    req.session.user = user;
      	    res.json({"code":"200"});
	  }
	  else{
	    res.json({"code":"0"});
	  }
	}
	else{
	  console.log(err);
    	  res.json({"code":"0"});
	}	
     });
   }
});

//this will be called when the form has been filled out so that we can 
//add a new user, this function should redirect to /users/home once the user
//has been created otherwise send us back to newUser page
router.post('/addNewUser', function(req, res){
  if(req.body.name === "" || req.body.password === "" || req.body.repassword === "" || req.body.email === ""){
    //req.flash('add', 'Please fill in all fields');
    res.redirect('/signup');
  }
  else{
    if(req.query.password !== req.query.repassword){
      res.json({"code":"0"});
    }
    else{
      userlib.isUser(req.body.name, function(err){
	if(err === undefined){
          res.json({"code":"1"});
 	}
	else{
	  
	  userlib.addNewUser(req.body.name, req.body.password,
		req.body.email, function(err, user){	  
	    if(err === undefined){
	      req.session.user = user;
              res.json({"code":"200"});
	    }
	    else{
	      req.flash('add', err);
	      res.redirect('/signup');
	    }
	  });
	}
      });
    }
  }
});

module.exports = router;

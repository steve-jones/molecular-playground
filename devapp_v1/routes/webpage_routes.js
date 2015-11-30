var express = require('express');
var router = express.Router();
var model = require('../model/auth');

// Homepage
router.get('/', function(req, res) {

	var user_obj = req.session.user;
	model.getCourse('CS121',function(err,data){
		if(err)
			console.log("course not found\n");
		else{
			testdata = JSON.parse(data);
			console.log(testdata);
					
      	    		res.render('home_page', { userinfo   : user_obj, testdata: testdata});
		}
	
	}); 
	
});


// Login page
router.post('/login', function (req, res) {
  var post = req.body;
  if (post.user === 'john' && post.password === 'johnspassword') {
    req.session.user_id = 'johns_user_id_here';
    res.redirect('/');
  } else {
    res.render('/');
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

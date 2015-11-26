var express = require('express');
var router = express.Router();

var m = require('../model/auth');

//Server-Side stats middleware
router.use(function (req, res, next) {
	console.log();
  console.log('Time:', Date(Date.now()));
  next();
});

// ## main
// The main user view.

router.get('/', function(req, res) {

	var user_obj = req.session.user;
	m.getCourse('CS121',function(err,data){
		if(err)
			console.log("course not found\n");
		else{
			testdata = JSON.parse(data);
			console.log(testdata);
					
      	    		res.render('home_page', { userinfo   : user_obj, testdata: testdata});
		}
	
	}); 
	
});

router.get('/edit', function(req, res) {
	var user_obj = req.session.user;
	res.render('edit', { userinfo   : user_obj});
});
router.get('/about', function(req, res) {
	var user_obj = req.session.user;
	res.render('about', { userinfo   : user_obj});
});

router.post('/authenticate', function(req, res) {
	
});

router.post('/login', function(req,res) {

});

router.post('/logout', function(req,res) {

});


module.exports = router;

var express = require('express');
var router = express.Router();

var m = require('../controller/auth');

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
					
      	    		res.render('index', { userinfo   : user_obj, testdata: testdata});
		}
	
	}); 
	
});

router.post('/authenticate', function(req, res) {
	
});

router.post('/login', function(req,res) {

});

router.post('/logout', function(req,res) {

});


module.exports = router;
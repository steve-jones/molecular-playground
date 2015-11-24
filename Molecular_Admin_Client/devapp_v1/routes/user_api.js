var express = require('express');
var router = express.Router();


router.post('/createuser', function(req,res) {
	var user = req.session.user;
	  	if (user === undefined || user.role !=='global_admin') {
		    	req.flash('auth', 'Not logged in!');
	    		res.redirect('/login');
		}
		else{}
});

router.post('/edit/:userid', function(req, res) {
	
});


router.post('/disable/:userid', function(req,res) {

});

router.post('/delete/:userid', function(req,res) {

});


module.exports = router;

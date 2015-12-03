var express = require('express');
var router = express.Router();

var m = require('../model/user_functions');

router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('users_template/user_page', { userinfo   : user_obj});
});

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

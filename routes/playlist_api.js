var express = require('express');
var router = express.Router();

var m = require('../model/playlist_functions');


router.get('/', function(req, res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	res.render('playlist_templates/playlist_page', { userinfo   : user});
});

router.get('/list', function(req, res) {
	var user = req.session.user;	

	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	res.render('playlist_templates/list', { userinfo   : user});
});


router.post('/createplaylist', function(req,res) {
	var user = req.session.user;
	  	if (user === undefined || user.role !=='global_admin') {
		    	req.flash('auth', 'Not logged in!');
	    		res.redirect('/login');
		}
		else{}
});




module.exports = router;

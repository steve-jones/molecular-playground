var express = require('express');
var router = express.Router();

var m = require('../model/playlist_functions');


router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('playlist_templates/playlist_page', { userinfo   : user_obj});
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
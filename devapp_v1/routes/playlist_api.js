var express = require('express');
var router = express.Router();

var m = require('../model/playlist_functions');

router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('playlist_page', { userinfo   : user_obj});
});

router.post('/create', function(req,res) {
	var user = req.session.user;
	if (!check(user)) res.redirect('/login');
	else {
		// TODO: create and store playlist in DB
	}
});

//////////
// Utility functions
//////////
function check(user) {
	if (!user) return false;
	switch (user.role) {
		case 'global_admin':
		case 'local_admin':
		case 'delegate':
			return true;
		default:
			return false;
	}
	return false;
}

module.exports = router;

var express = require('express');
var router = express.Router();

var m = require('../model/playlist_functions');

router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('playlist_page', { userinfo   : user_obj});
});

router.post('/create', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else {
		// TODO: create and store playlist in DB
	}
});

router.post('/remove/:installationid', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.installationid) res.sendStatus(400);
	else {
		// TODO: remove playlist from DB
	}
});
router.post('/update/:id', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else {
		// TODO: update playlist in DB
	}
});

//////////
// Utility functions
//////////
function validRole(user) {
	switch (user.role) {
		case 'global_admin':
		case 'local_admin':
		case 'delegate':
			return true;
		default:
			return false;
	}
}

module.exports = router;

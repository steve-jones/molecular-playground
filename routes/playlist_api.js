var express = require('express');
var router = express.Router();

var model = require('../model/playlist_functions');

router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('playlist_templates/playlist_page', { userinfo   : user_obj});
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

router.post('/remove/:playlistid', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.playlistid) res.sendStatus(400);
	else {
		// TODO: remove playlist from DB
	}
});

router.post('/update/:playlistid', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.playlistid) res.sendStatus(400);
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

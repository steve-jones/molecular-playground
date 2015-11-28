var express = require('express');
var router = express.Router();
var model = require('../model/installtion_functions');

// object which contains DB access functions
var model = require('../model/installtion_functions');

// TODOs will be completed once DB API is ready.

router.post('/create', function(req,res) {
	var user = req.session.user;
	if (!check(user)) res.redirect('/login');
	else {
		// TODO: create installation row in DB.
	}
});

router.post('/remove/:id', function(req,res) {
	var user = req.session.user;
	if (!check(user)) res.redirect('/login');
	else if (!req.params.id) res.sendStatus(400);
	else {
		// TODO: delete installation row from DB.
	}
});

router.post('/update_local_admin/:id', function(req,res) {
	var user = req.session.user;
	if (!check(user)) res.redirect('/login');
	else if (!req.params.id) res.sendStatus(400);
	else {
		// TODO: update local admin column by row ID in DB.
	}
});

/////////
// Utility Functions
/////////
function check(user) {
	return user && user.role === 'global_admin';
}

module.exports = router;

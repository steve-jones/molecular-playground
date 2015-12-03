var express = require('express');
var router = express.Router();

// object which contains DB access functions
var model = require('../model/installtion_functions');

// for FRONT-END testing purposes only (renders installation views.)//
router.get('/', function(req, res){
	res.render('installation_templates/installation_page');
});

router.get('/add', function(req, res){
	res.render('add');
});

router.get('/edit', function(req, res){
	res.render('edit');
});
// testing END.

// TODOs will be completed once DB API is ready.

// note: 12/2. changed router method to GET.
// the route will get the create installation view which will have a form, etc.
// with the submit button on this form, a post request will be performed..
router.get('/create', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else {
		// TODO: create installation row in DB.
	}
});

router.post('/remove/:installationId', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.installationId) res.sendStatus(400);
	else {
		// TODO: delete installation row from DB.
	}
});

router.post('/update_local_admin/:userid', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.userid) res.sendStatus(400);
	else {
		// TODO: update local admin column by row ID in DB.
	}
});

router.post('/add_delegate/:userid', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.userid) res.sendStatus(400);
	else {
		// TODO: add delegate to installation in DB.
	}
});

router.post('/remove_delegate/:userid', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.userid) res.sendStatus(400);
	else {
		// TODO: remove delegate from installation in DB.
	}
});

/////////
// Utility Functions
/////////
function isGlobalAdmin(user) {
	return user.role === 'global_admin';
}

function isLocalAdmin(user) {
	return isGlobalAdmin(user) || user.role === 'local_admin';
}

module.exports = router;

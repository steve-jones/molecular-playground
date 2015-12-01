var express = require('express');
var router = express.Router();

// object which contains DB access functions
var model = require('../model/installtion_functions');



// for FRONT-END testing purposes only (renders installation views.)//
router.get('/', function(req, res){
	res.render('installation_page');
});

router.get('/add', function(req, res){
	res.render('add');
});

router.get('/edit', function(req, res){
	res.render('edit');
});
// testing END	.





// TODOs will be completed once DB API is ready.

router.post('/create', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else {
		// TODO: create installation row in DB.
	}
});

router.post('/remove/:id', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.id) res.sendStatus(400);
	else {
		// TODO: delete installation row from DB.
	}
});

router.post('/update_local_admin/:id', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!validRole(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.id) res.sendStatus(400);
	else {
		// TODO: update local admin column by row ID in DB.
	}
});

/////////
// Utility Functions
/////////
function validRole(user) {
	return user.role === 'global_admin';
}

module.exports = router;

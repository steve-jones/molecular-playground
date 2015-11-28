var express = require('express');
var router = express.Router();
var model = require('../model/installtion_functions');

router.post('/create', function(req,res) {
	var user = req.session.user;
	if (!check(user)) {
		res.redirect('/login');
	}
	else {

	}
});

router.post('/remove', function(req,res) {
	var user = req.session.user;
	if (!check(user)) {
		res.redirect('/login');
	}
	else {

	}
});

router.post('/edit', function(req,res) {
	var user = req.session.user;
	if (!check(user)) {
		res.redirect('/login');
	}
	else {

	}
});

function check(user) {
	return user && user.role === 'global_admin';
}

module.exports = router;

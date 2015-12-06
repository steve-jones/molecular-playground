var express = require('express');
var router = express.Router();

// object which contains DB access functions
var installation_model = require('../database/installationAPI');

//////////
// Installation views rendering routes
//////////
router.get('/', function(req, res){
	res.render('installation_templates/installation_page');
});

router.get('/edit', function(req, res){
	res.render('installation_templates/edit');
});

router.get('/create', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else {
		res.render('installation_templates/add');
	}
});

//////////
// Backend API routes
//////////
router.post('/create', function(req,res) {
	var city, country, school_affiliation, local_admin_id, GPS_location_x, GPS_location_y;
	city = req.body.form-city;
	country = req.body.form-country;
	school_affiliation = req.body.form-school_affiliation;
	local_admin_id = req.body.form-local_admin_id;
	location_x = req.body.GPS_location_x;
	location_y = req.body.GPS_location_y;

	installation_model.addInstallation(city, country, school_affiliation, local_admin_id, location_x, location_y);

	res.end();
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
		installation_model.deleteInstallation(req.params.installationId);
		res.end();
	}
});

router.post('/update_local_admin', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else {
		var installation_id, new_local_admin_id;
		// TODO: figure out the data structure received from front end

		installation_model.updateLocalAdmin(installation_id, new_local_admin_id);
		res.end();
	}
});

router.post('/add_delegate/:installationId', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.userid) res.sendStatus(400);
	else {
		var installation_id, firstName, lastName, username, password, email, role;
		installation_model.addLocalDelegate(installation_id, firstName, lastName, username, password, email, role);
		res.end();
	}
});

router.post('/remove_delegate', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.userid) res.sendStatus(400);
	else {
		var installation_id, delegate_id, delegate_username;

		installation_model.removeLocalDelegate(installation_id, delegate_id, delegate_username);
		res.end();
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

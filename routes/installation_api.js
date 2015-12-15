// object which contains DB access functions
var express = require('express');
var router = express.Router();

var installation_model = require('../database/installationAPI');
var user_model = require('../database/usersAPI');
var UserRole = require('../model/UserRole');

var INSTALLATION_ROOT = '/installation'

//////////
// Installation views rendering routes
//////////
router.get('/', function(req, res){
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		res.redirect('/');
		console.log('invalid role: ' + user.role);
	}
	else res.render('installation_templates/installation_page', {
		userinfo: user,
		installation_flash_message: req.flash('installation_flash_message')
	});
});

router.get('/edit', function(req, res){
	var user = req.session.user;
	console.log(user);
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else {
		installation_model.getInstallations(function(data){
			var insta, localAdminId;
			localAdminId = user.id;
			if (isGlobalAdmin(user)) insta = data;
			else insta = getInstallationByAdminId(localAdminId, data);
			// overview: pass res.render an array of JSON
			res.render('installation_templates/edit', {
				userinfo: user, insta: insta
			});
		});
	}
});

router.get('/create', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('installation_flash_message', "Invalid Role");
		res.redirect(INSTALLATION_ROOT);
	}
	else {
		res.render('installation_templates/add', {userinfo: user});
	}
});

//////////
// Backend API routes
//////////
router.post('/create', function(req,res) {
	var city, country, school_affiliation, local_admin_id, GPS_location_x, GPS_location_y;
	city = req.body.form_city;
	country = req.body.form_country;
	school_affiliation = req.body.form_school_affiliation;
	username = req.body.form_username;
	location_x = req.body.form_GPS_location_x;
	location_y = req.body.form_GPS_location_y;

	user_model.getUser(username, function(user, role, err) {
		if (err) {
			req.flash('installation_flash_message', 'Unable to create installation.');
			res.redirect(INSTALLATION_ROOT);
		}
		else {
			installation_model.addInstallation(city, country, school_affiliation, user.id, location_x, location_y, function(data, err) {
				if (err) req.flash('installation_flash_message', 'Unable to create installation.');
				else req.flash('installation_flash_message', 'Installation created.');
				res.redirect(INSTALLATION_ROOT);
			});
		}
	});
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
		res.redirect(INSTALLATION_ROOT);
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
		res.redirect(INSTALLATION_ROOT);
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
		res.redirect(INSTALLATION_ROOT);
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
		res.redirect(INSTALLATION_ROOT);
	}
});

/////////
// Utility Functions
/////////
function isGlobalAdmin(user) {
	return user.role === UserRole.prototype.GLOBAL_ADMIN;
}

function isLocalAdmin(user) {
	return user.role <= UserRole.prototype.LOCAL_ADMIN;
}

function getInstallationByAdminId(adminId, installations) {
	var result = [];
	for (var i = 0; i < installations.length; i++) {
		var cur = installations[i];
		if (cur.localadminid === adminId) result.push(cur);
	}
	return result;
}

module.exports = router;

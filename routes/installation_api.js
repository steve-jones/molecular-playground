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
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
		console.log('invalid role: ' + user.role);
	}
	else res.render('installation_templates/installation_page', {
		userinfo: user,
		create_installation_status: req.flash('create_installation_status')
	});
});

router.get('/edit', function(req, res){
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
		console.log('invalid role');
	}
	else res.render('installation_templates/edit', {userinfo: user});
});

router.get('/create', function(req,res) {
	var user = req.session.user;
	if (!user) res.redirect('/login');
	else if (!isGlobalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
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
			req.flash('create_installation_status', 'Unable to create installation.');
		}
		else {
			installation_model.addInstallation(city, country, school_affiliation, user.id, location_x, location_y, function(err) {
				if (err) {
					req.flash('create_installation_status', 'Unable to create installation.');
				}
				else {
					req.flash('create_installation_status', 'Installation created.');
				}
			});
		}
		res.redirect(INSTALLATION_ROOT);
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

module.exports = router;

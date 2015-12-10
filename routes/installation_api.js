var express = require('express');
var router = express.Router();

// object which contains DB access functions
<<<<<<< HEAD
var installation_model = require('../database/installationAPI');
=======
var model = require('../database/installationAPI');
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf

//////////
// Installation views rendering routes
//////////
router.get('/', function(req, res){
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else
	res.render('installation_templates/installation_page',{ userinfo   : user});
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

<<<<<<< HEAD
//////////
// Backend API routes
//////////
router.post('/create', function(req,res) {
	console.log(req.body);
	var city, country, school_affiliation, local_admin_id, GPS_location_x, GPS_location_y;
	city = req.body.form-city;
	country = req.body.form-country;
	school_affiliation = req.body.form-school_affiliation;
	local_admin_id = req.body.form-local_admin_id;
	location_x = req.body.GPS_location_x;
	location_y = req.body.GPS_location_y;

	installation_model.addInstallation(city, country, school_affiliation, local_admin_id, location_x, location_y);
	res.redirect('/installation');
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
		res.redirect('/installation');
	}
=======
	// note: the code below is commented out only for testing the views,
	// please uncomment whenever needed -- phil.	

	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else
	res.render('installation_templates/add',{ userinfo   : user});
	//
	// if (user===undefined) res.redirect('/login');
	// else {
	// 	// TODO: create installation row in DB.
	// }
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
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

<<<<<<< HEAD
		installation_model.updateLocalAdmin(installation_id, new_local_admin_id);
		res.redirect('/installation');
	}
=======
// new route handler for post request (form logic for new installation for..)
router.post('/installation_add', function(req,res) {
	var user = req.session.user;

	var form = req.body; // object of html form
	console.log("this is our form: " +JSON.stringify(form))

	model.addInstallation(form.form_city, form.form_country, form.form_school_affiliation, form.form_username, form.form_GPS_location_x, form.form_GPS_location_y, function(err){
		console.log(err + " hello");
			model.getInstallations(function(data){console.log("data: " + JSON.stringify(data))})
	});
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else if (!req.params.id) res.sendStatus(400);
	else {
		// TODO: update local admin column by row ID in DB.
	}
});


// overview: this is the Edit Installation view.
router.get('/edit', function(req, res){
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else
	res.render('installation_templates/edit',{ userinfo   : user});
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
});

router.post('/add_delegate/:installationId', function(req,res) {
	var user = req.session.user;
<<<<<<< HEAD
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.userid) res.sendStatus(400);
=======
		if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else if (!req.params.id) res.sendStatus(400);
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
	else {
		var installation_id, firstName, lastName, username, password, email, role;
		installation_model.addLocalDelegate(installation_id, firstName, lastName, username, password, email, role);
		res.redirect('/installation');
	}
});

router.post('/remove_delegate', function(req,res) {
	var user = req.session.user;
<<<<<<< HEAD
	if (!user) res.redirect('/login');
	else if (!isLocalAdmin(user)) {
		req.flash('invalid_role', "Invalid Role");
		res.redirect('/');
	}
	else if (!req.params.userid) res.sendStatus(400);
=======
		if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	else if (!req.params.id) res.sendStatus(400);
>>>>>>> 46b0b6e3236f2d4fb23288bba36584258ca056cf
	else {
		var installation_id, delegate_id, delegate_username;

		installation_model.removeLocalDelegate(installation_id, delegate_id, delegate_username);
		res.redirect('/installation');
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

var express = require('express');
var router = express.Router();

var m = require('../model/molecule_functions');


router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('molecule_page', { userinfo   : user_obj});
});

/* NOTE: 
ROUTES CURRENTLY LISTED HAVE PLACEHOLDER ROUTING DESTINATIONS.
REPLACE WITH ACCURATE ROUTES ONCE I SPEAK TO TEAM TONIGHT. */

router.post('/createmolecule', function(req,res) {
	var user = req.session.user;
		if (!user) res.redirect('/login');
	  	else if (!validRole(user)) {
		    	req.flash('invalid_role', "Invalid Permissions");
	    		res.redirect('/login');
		}
		else{
			//create molecule from DB
		}
});

router.post('/deletemolecule', function(req,res) {
	var user = req.session.user;
		if (!user) res.redirect('/login');
	  	else if (!validRole(user)) {
		    	req.flash('invalid_role', "Invalid Permissions");
	    		res.redirect('/login');
		}
		else{
			//delete molecule from DB
		}
});

router.post('/updatemolecule', function(req,res) {
	var user = req.session.user;
		if (!user) res.redirect('/login');
	  	else if (!validRole(user)) {
		    	req.flash('invalid_role', "Invalid Permissions");
	    		res.redirect('/login');
		}
		else{
			//update a molecule from DB
		}
});

router.post('/approvemolecule', function(req,res) {
	var user = req.session.user;
		if (!user) res.redirect('/login');
	  	else if (!validRole(user)) {
		    	req.flash('invalid_role', "Invalid Permissions");
	    		res.redirect('/login');
		}
		else{
			//approve a molecule for integration in pending molecules (DB function)
		}
});

router.post('/rejectmolecule', function(req,res) {
	var user = req.session.user;
		if (!user) res.redirect('/login');
	  	else if (!validRole(user)) {
		    	req.flash('invalid_role', "Invalid Permissions");
	    		res.redirect('/login');
		}
		else{
			//reject a molecule from integration in pending molecules (DB function)
		}
});


//////////
// Utility functions
//////////
function validRole(user) {
	switch (user.role) {
		case 'global_admin':
			return true;
		default:
			return false;
	}
}

module.exports = router;

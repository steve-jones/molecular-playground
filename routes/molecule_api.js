var express = require('express');
var router = express.Router();

var m = require('../model/molecule_functions');


router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('molecule_page', { userinfo   : user_obj});
});

////// UPLOAD ///////
// Upload a molecule, pending approval
// GLOBAL ADMIN request approves immediately
/////////////////////

router.get('/createmolecule', function(req, res) {
	var molDB = require('../database/moleculeAPI.js');
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please sign in.");
	    }
		//if it is not a global admin but is some other user, go through approval process
		else {
			var user_id = user.id;
			var file_path = "filepath"; req.session.uploadfilepath;// get from frontend
			var molecule_name = "name"; // get from frontend
			if (!validGlobalAdmin(user)){
				molDB.createMolecule(user_id, molecule_name, file_path, false, function(placeholder) {
					//body of callback
				});
				res.redirect('back');
				req.flash('upload_success_state', "Uploaded. New molecule pending approval.");
			}
		//if it is a global admin, approve immediately
			else {
				molDB.createMolecule(user_id, molecule_name, file_path, true, function(placeholder) {
					//body of callback
				});
				res.redirect('back');
				req.flash('upload_success_state', "Uploaded. New molecule pending approval.");
			}
		}
});

		/*
		We found that, given enough time, we would classify requests into separate queues.
		We would have a deletion queue, an update queue, and a new molecule queue.
		We were able to write the backend code for both.
		However, we were not able to alter the database given the amount of time.
		If we were to implement them, we would have a request classifier that would sort
		it into the correct queue, and then they could be approved or rejected by a global admin.
		The following placeholders are where the routing code would go for these functions.
		*/


////// INDEX ////////
// Sends an index of molecules to front end
// ANYONE accesses this
/////////////////////
router.get('/allmolecules', function(req, res) {
	var molDB = require('../database/moleculeAPI.js');
	var user = req.session.user;
	var molecules = [];
	if (!validRole(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to an account.");
	    }
		else {
			molDB.getMolecules(function(allMolecules) {
				for (int i = 0; i < allMolecules.length; i++) {
					molecules.push(allMolecules[i]);
				}
		res.render('/molecule_templates/allmolecules', {pendingList: molecules});
		//push to frontend
		});
	} 
}




///// PENDING ///////
// Sends a list of molecules waiting to front end
// GLOBAL ADMIN accesses this
/////////////////////

router.get('/pendingrequest', function(req, res) {
	var molDB = require('../database/moleculeAPI.js');
	var user = req.session.user;
	var molecules = [];
	if (!validRole(user) || !validGlobalAdmin(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to a global admin account.");
	    }
		else {
			molDB.getMolecules(function(allMolecules) {
				for (int i = 0; i < allMolecules.length; i++) {
					if (allMolecules[i].approval_status == false) {
						molecules.push(allMolecules[i]);
					} 
				}
		res.render('/molecule_templates/pending', {pendingList: molecules});
		});
	} 
}

/* PENDING REQUESTS */

////// APPROVE //////
// Approves a selected request in collection of requests that are pending approval
// Only GLOBAL ADMIN may access approval pending
/////////////////////

router.get('/approverequest', function(req, res) {
	var molDB = require('../database/moleculeAPI.js');
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user) || !validGlobalAdmin(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to a global admin account.");
	    }
		else {
			var moleculeID = req.body;//placeholder
			molDB.setApprovalStatus(moleculeID, true);
			res.redirect('back');
			req.flash('approval_success_state', "Approved new molecule.");
		}
});

////// REJECT ///////
// Rejects a selected request in collection of requests that are pending approval
// Only GLOBAL ADMIN may access approval pending
/////////////////////

router.get('/rejectrequest', function(req, res) {
	var molDB = require('../database/moleculeAPI.js');
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user) || !validGlobalAdmin(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to a global admin account.");
	    }
		else {
			var moleculeID = req.body;//placeholder
			molDB.deleteMolecule(moleculeID);
			res.redirect('back');
			req.flash('reject_success_state', "Rejected request.");
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
		case 'author':
			return true;
		default:
			return false;
	}
}

function validGlobalAdmin(user) {
	switch (user.role) {
		case 'global_admin':
			return true;
		default: 
			return false;
	}
}

module.exports = router;

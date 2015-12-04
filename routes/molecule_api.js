var express = require('express');
var router = express.Router();

var m = require('../model/molecule_functions');


router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('molecule_page', { userinfo   : user_obj});
});

			// TODO: define removeRequest() pop function

////// UPLOAD ///////
// Upload a molecule, pending approval
// GLOBAL ADMIN request approves immediately
/////////////////////

router.post('/uploadmolecule', function(req,res) {
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid Permissions");
	    }
		//if it is not a global admin but is some other user, go through approval process
		else {
			if (!validGlobalAdmin(user)){
				retrieved_file = (( RETRIEVED FILE PLACEHOLDER ));
				addToPendingRequest : function (retrieved_file, upload_request); (( DB PLACEHOLDER ))
				//Success or fail state
				// if ('success'){
				res.redirect('back');
				req.flash('upload_success_state', "Uploaded. New molecule pending approval.");
				// }
				// else {
				// 	res.redirect('back');
				// 	req.flash('upload_fail_state', "Not uploaded successfully. Please try again.");
				// }
			}
		//if it is a global admin, approve immediately
			else approveNewMolecule : function(retrieved_file);
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

////// DELETE ///////
// Delete a molecule, pending approval
// GLOBAL ADMIN request approves immediately
/////////////////////

////// UPDATE ///////
// Update a pre-existing molecule, pending approval
// GLOBAL ADMIN request approves immediately
/////////////////////

		/*END PLACEHOLDERS*/

////// APPROVE //////
// Approves a selected request in collection of requests that are pending approval
// Only GLOBAL ADMIN may access approval pending
/////////////////////

router.get('/approverequest', function(req,res) {
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user) || !validGlobalAdmin(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to a global admin account.");
	    }
		else {
			retrieved_file = (( RETRIEVED FILE PLACEHOLDER ));
			approveNewMolecule : function(retrieved_file);
			removeRequest(); //placeholder
			res.redirect('back');
			// if ('success'){
			req.flash('approval_success_state', "Approved new molecule.");
			// }
			// else req.flash('approval_fail_state', "Approval failure. Please refresh.");
		}
});

////// REJECT ///////
// Rejects a selected request in collection of requests that are pending approval
// Only GLOBAL ADMIN may access approval pending
/////////////////////

router.get('/rejectrequest', function(req,res) {
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user) || !validGlobalAdmin(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to a global admin account.");
	    }
		else {
			retrieved_file = (( RETRIEVED FILE PLACEHOLDER ));
			retrieved_request_type = //retrieved_file.request_type();
			removeRequest(); // placeholder
			res.redirect('back');
			// if ('success'){
			req.flash('reject_success_state', "Rejected request.");
			// }
			// else req.flash('reject_fail_state', "Failed to reject request. Please refresh.");
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

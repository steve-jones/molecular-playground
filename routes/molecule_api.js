var express = require('express');
var router = express.Router();

var m = require('../model/molecule_functions');


router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('molecule_page', { userinfo   : user_obj});
});

			//NOTE: requests need to be classified into type of deletion for my routes to work...
			// TODO: define 'success' conditional
			// TODO: define removeRequest() pop function
			// TODO: define retrieved_file.request_type(), returns request_type (upload, deletion, update)

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
				if ('success'){
					res.redirect('back');
					req.flash('upload_success_state', "Uploaded successfully. New molecule pending approval.");
				}
				else {
					res.redirect('back');
					req.flash('upload_fail_state', "Not uploaded successfully. Please try again.");

				}
			}
		//if it is a global admin, approve immediately
			else approveNewMolecule : function(retrieved_file);
		}
});

////// DELETE ///////
// Delete a molecule, pending approval
// GLOBAL ADMIN request approves immediately
/////////////////////

router.post('/deletemolecule', function(req,res) {
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid Permissions");
	    }
	    //if it is not a global admin but is some other user, go through approval process
		else{
			if (!validGlobalAdmin(user)) {
				retrieved_file = (( RETRIEVED FILE PLACEHOLDER ));
				addToPendingRequest : function (retrieved_file, deletion_request); (( DB PLACEHOLDER ))
				if ('success'){
					res.redirect('back');
					req.flash('deletion_success_state', "Deletion requested. Pending approval.");
				}
				else {
					res.redirect('back');
					req.flash('deletion_fail_state', "Deletion request failed. Please try again.");

				}
			}
		// if it is a global admin, approve immediately
			else approveDeletion : function(retrieved_file);

		}
});

////// UPDATE ///////
// Update a pre-existing molecule, pending approval
// GLOBAL ADMIN request approves immediately
/////////////////////

router.post('/updatemolecule', function(req,res) {
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validRole(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid Permissions");
	    }
		else{
			if (!validGlobalAdmin(user)) {
				retrieved_file = (( RETRIEVED FILE PLACEHOLDER ));
				addToPendingRequest : function (retrieved_file, update_request); (( DB PLACEHOLDER ))
				if ('success'){
					res.redirect('back');
					req.flash('update_success_state', "Update requested, update uploaded successfully. Pending approval.");
				}
				else {
					res.redirect('back');
					req.flash('update_fail_state', "Update not uploaded successfully, no update requested. Please try again.");

				}
			}
		// if it is a global admin, approve immediately
			else approveUpdate : function(retrieved_file);
		}
});

////// APPROVE //////
// Approves a selected request in collection of requests that are pending approval
// Only GLOBAL ADMIN may access approval pending
/////////////////////

router.get('/approverequest', function(req,res) {
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validGlobalAdmin(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to a global admin account.");
	    }
		else {
			retrieved_file = (( RETRIEVED FILE PLACEHOLDER ));
			retrieved_request_type = //retrieved_file.request_type();

			switch (retrieved_request_type) {
				case 'upload_request':
					approveNewMolecule : function(retrieved_file);
					res.redirect('back');
					if ('success'){
						req.flash('approval_success_state', "Approved new molecule.");
					}
					else req.flash('approval_fail_state', "Approval failure. Please refresh.");
					break;
				case 'deletion_request':
					approveDeletion : function(retrieved_file);
					res.redirect('back');
					if ('success'){
						req.flash('approval_success_state', "Approved deletion.");
					}
					else req.flash('approval_fail_state', "Approval failure. Please refresh.");
					break;
				case 'update_request':
					approveUpdate : function(retrieved_file);
					res.redirect('back');
					if ('success'){
						req.flash('approval_success_state', "Approved update.");
					}
					else req.flash('approval_fail_state', "Approval failure. Please refresh.");
					break;
			}
		}
});

////// REJECT ///////
// Rejects a selected request in collection of requests that are pending approval
// Only GLOBAL ADMIN may access approval pending
/////////////////////

router.get('/rejectrequest', function(req,res) {
	var user = req.session.user;
		//base user cases -- not a valid user
		if (!validGlobalAdmin(user)) {
			res.redirect('/login');
	    	req.flash('invalid_role', "Invalid permissions. Please log in to a global admin account.");
	    }
		else {
			retrieved_file = (( RETRIEVED FILE PLACEHOLDER ));
			retrieved_request_type = //retrieved_file.request_type();

			removeRequest(); // placeholder
			res.redirect('back');
			if ('success'){
				req.flash('reject_success_state', "Rejected request.");
			}
			else req.flash('reject_fail_state', "Failed to reject request. Please refresh.");
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

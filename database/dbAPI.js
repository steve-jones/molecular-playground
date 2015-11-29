
var dbReader = require('./databaseReader.js');
var dbFunctions = require('./dbFunctions.js');

module.exports = {
	//users
	createUser : function(firstName, lastName, username, password, email, role) {
		createUserParameterCheck(firstName, lastName, username, password, email, role);
		parameters = [firstName, lastName, username, password, email, role];
		dbFunctions.usernameExists(username, function(usernameExists){
			if(usernameExists === 'false'){
				dbReader.executeFunction('add_user', parameters, function(err){
				});
			}
			else{
				console.log("username exists");
			}
		});

		// TODO: Throw exception if user already exists (email duplicate)
		// TODO: Throw exception for invalid role
	}//, needs a comma
	//updateProfile
	//parameters can be null and update_profile in progress

// Any of these that have return statements should probably use callbacks instead	


//	updateProfile : function (firstName, lastName, username, password, email, role) {
//		parameters = [firstName, lastName, username, password, email, role];
//		dbReader.executeFunction('update_profile', parameters); 
//	},
	
	//manageDelegates this will be handeled by create user and update profile
		//add,edit and remove local delegate

//	removeUser : function(id or username){
//		parameters = [id or username];	
//		db.Reader.executeFunction('remove_user', parameters);
//  },
	
	//global admin
//	displayInstallations : function(callback){
//		callback(db.Reader.executeFunction('display_installations'));
//	},

//	addInstallation : function(installation_parameters){
//		parameters = [installation_parameters];
//		db.Reader.executeFunction('add_installation', parameters);
//	},

//	deleteInstallation : function(installation_id){
//		db.Reader.executeFunction('delete_installation', installation_id);
//	},

//  disableInstallation ???

//	disableUser ???
	
//	getSpecificInstallation : function(installation_id, callback){
//		callback(db.Reader.executeFunction('get_specfic_installation', installation_id));
//	}, 
	
	//molecule

//	getMolecules : function(callback){
//		callback(db.Reader.executeFunction('get_molecules'));
//	},

//	getSpecificMolecule : function(molecule_id, callback){
//		callback(db.Reader.executeFunction('get_specfic_molecule', molecule_id));
//	},

//  this is upload content
//	addToPendingRequest : function(molecule_files){
//		db.Reader.executeFunction('add_to_pending_request', molecule_files);
//	},

//	getPendingRequest : function(callback){
//		callback(db.Reader.executeFunction('get_pending_request'));
//	},

//	approveNewMolecule : function(molecule_files){
//		db.Reader.executeFunction('approve_new_molecule', molecule_files);
//	},
	
	//playlist

//	getPlaylists : function(callback){
//		callback(db.Reader.executeFunction('get_playlits'));
//  },

//	getSpecificPlaylist : function(playlist_id, callback){
//		callback(db.Reader.executeFunction('get_specific_playlists', playlist_id));
//	},

//	createPlaylist : function(playlist_name){
//		db.Reader.executeFunction('create_playlists', playlist_name);
//	},

//	createPlaylist(molecule, approved) ???

//	addToPlaylist : function(playlist_id, molecule_id){
//		parameters = [playlist_id, molecule_id];
//		db.Reader.executeFunction('add_to_playlist', parameters);
//	},

//	removePlaylist : function(playlist_id){
//		db.Reader.executeFunction('remove_playlist', playlist_id);
//	},

//	removeMoleculeFromPLaylist : function(molecule_id, playlist_id){
//		parameters = [playlist_id, molecule_id];
//		db.Reader.executeFunction('remove_molecule_from_playlist', parameters);
//	},

//	scheduleContent : function(playlists_id, time, date){
//		parameters = [playlists_id, time, date];
//		db.Reader.executeFunction('schedule_content', parameters);
//	}

}



function createUserParameterCheck(firstName, lastName, username, password, email, role) {
	var errorMessageStart = "Error in function \"createNewUser\": ";
	var errorMessageEnd   = " must not be null or empty.";
	if (firstName == null || firstName == '') {
		throw errorMessageStart + "first name" + errorMessageEnd;
	}

	if (lastName == null || lastName == '') {
		throw errorMessageStart + "last name" + errorMessageEnd;
	}

	if (username == null || username == '') {
		throw errorMessageStart + "username" + errorMessageEnd;
	}

	if (password == null || password == '') {
		throw errorMessageStart + "password" + errorMessageEnd;
	}

	if (email == null || email == '') {
		throw errorMessageStart + "email" + errorMessageEnd;
	}

	if (role == null || role == '') {
		throw errorMessageStart + "role" + errorMessageEnd;
	}

	// TODO: Type checking of each parameter
}

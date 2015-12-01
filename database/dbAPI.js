
var dbReader = require('./databaseReader.js');
var dbFunctions = require('./dbFunctions.js');
var crypto = require('./encryption.js');

module.exports = {

	createUser : function(firstName, lastName, username, password, email, role) {
		var encryptedPassword = crypto.encrypt(password);
		parameters = [firstName, lastName, username, encryptedPassword, email, role];
		dbFunctions.usernameExists(username, function(usernameExists){
			if(usernameExists === 'false'){
				dbReader.executeFunction('add_user', parameters, function(err){
				});
			}
			else{
				//replace with better feedback
				console.log("username exists");
			}
		});
	},


	
	// updateProfile
	// parameters can be null and update_profile in progress

	// Any of these that have return statements should probably use callbacks instead	

	// This updates a users personal data. If a parameter shouldn't be updated then make it undefined
	updateProfile : function (firstName, lastName, username, password, email) {
		if(email != undefined){
			dbReader.executeFunction('update_email', email, function(err){
				}); 
		}
		if(password != undefined){
			dbReader.executeFunction('update_password', password); 
		}
		if(username != undefined){
			dbFunctions.usernameExists(username, function(usernameExists){
				if(usernameExists === 'false'){
					dbReader.executeFunction('update_username', parameters, function(err){
					});
				}
				else{
					//replace with better feedback
					console.log("username exists");
				}
			});
		}
		if(firstName != undefined){
			dbReader.executeFunction('update_first_name', parameters, function(err){
				}); 
		}
		if(lastName != undefined){
			dbReader.executeFunction('update_last_name', parameters, function(err){
				}); 
		}
	},
	
	//manageDelegates this will be handeled by create user and update profile above
		//add,edit and remove local delegate

	// removeUser : function(username){
	// 	dbReader.executeFunction('remove_user', username, function(){
	// 	});
 // 	},
	
	//global admin
//	displayInstallations : function(callback){
//		callback(dbReader.executeFunction('display_installations'));
//	},

//	addInstallation : function(installation_parameters){
//		parameters = [installation_parameters];
//		dbReader.executeFunction('add_installation', parameters);
//	},

//	deleteInstallation : function(installation_id){
//		dbReader.executeFunction('delete_installation', installation_id);
//	},

//  disableInstallation ???

//	disableUser ???
	
//	getSpecificInstallation : function(installation_id, callback){
//		callback(dbReader.executeFunction('get_specfic_installation', installation_id));
//	}, 
	
	//molecule

//	getMolecules : function(callback){
//		callback(dbReader.executeFunction('get_molecules'));
//	},

//	getSpecificMolecule : function(molecule_id, callback){
//		callback(dbReader.executeFunction('get_specfic_molecule', molecule_id));
//	},

//  this is upload content
//	addToPendingRequest : function(molecule_files){
//		dbReader.executeFunction('add_to_pending_request', molecule_files);
//	},

//	getPendingRequest : function(callback){
//		callback(dbReader.executeFunction('get_pending_request'));
//	},

//	approveNewMolecule : function(molecule_files){
//		dbReader.executeFunction('approve_new_molecule', molecule_files);
//	},
	
	//playlist

	//returns an array of JSON objects of all playlists using a callback
// 	getPlaylists : function(callback){
// 		dbReader.executeFunction('get_playlist', function(playlists){
// 			callback(playlists);
// 		});
//  	},

// 	getSpecificPlaylist : function(playlist_id, callback){
// 		dbReader.executeFunction('get_specific_playlist', playlist_id, function(playlist){
// 			callback(playlist);
// 		});
// 	},

// 	createPlaylist : function(playlist_name, playlist_creator, installation,){
// 		parameters = [playlist_name, playlist_creator, NULL, installation, NULL, NULL, NULL, NULL, false];
// 		dbReader.executeFunction('create_playlists', parameters);
// 	},

// //	createPlaylist(molecule, approved) ???


// 	removePlaylist : function(playlist_id){
// 		dbReader.executeFunction('remove_playlist', playlist_id);
// 	},


// //add molecule to playlist
// 	addToPlaylist : function(playlist_id, molecule_id){
// 		parameters = [playlist_id, molecule_id];
// 		dbReader.executeFunction('add_to_playlist', parameters);
// 	},

// //	removeMoleculeFromPLaylist : function(molecule_id, playlist_id){
// //		parameters = [playlist_id, molecule_id];
// //		dbReader.executeFunction('remove_molecule_from_playlist', parameters);
// //	},

// //all of these parameters should have a value
// 	scheduleContent : function(playlists_id, start_time, end_time, start_date, end_date){
// 		parameters = [playlists_id, start_time, end_time, start_date, end_date];
// 		dbReader.executeFunction('schedule_content', parameters);
// 	}

}

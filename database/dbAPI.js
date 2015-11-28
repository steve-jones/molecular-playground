
var dbReader = require('./databaseReader.js');
var dbFunctions = require('./dbFunctions.js');

module.exports = {
	//users
	createUser : function(firstName, lastName, username, password, email, role) {
		createUserParameterCheck(firstName, lastName, username, password, email, role);
		parameters = [firstName, lastName, username, password, email, role];
		dbFunctions.usernameExists(username, function(usernameExists){
			if(usernameExists === 'false'){
				dbReader.executeFunction('add_user', parameters);
			}
			else{
				console.log("username exists");
			}
		});

		// TODO: Throw exception if user already exists (email duplicate)
		// TODO: Throw exception for invalid role
	}
	//updateProfile
	//parameters can be null and update_profile in progress
//	updateProfile : function (firstName, lastName, username, password, email, role) {
//		parameters = [firstName, lastName, username, password, email, role];
//		dbReader.executeFunction('update_profile', parameters); 
//	}
	
	//manageDelegates 
		//add,edit and remove local delegate
	
	//global admin
		//displayInstallationsStats(all)
		//addInstallation({installation data})
		//deleteInstallations(installation_id)
		//disableInstallation(installation_id)
		//deleteUser(user_id)
		//disableUser(user_id)
	
	//installation
		//manage, get installation details
	
	//molecule
		//getMolecules(all)
		//getMolecules(User.id)
		//uploadMolecules(molecule,script)
		//getPendingRequests(all)
		//approveNewMolecule(Molecule)
	
	//playlist
		//getPlaylists
		//getSpecificPlaylist(Playlist)
		//createPlaylist(molecule, approved)
		//createPlaylist()
		//addToPlaylist(molecule, Playlist)
		//removePlaylist(Playlist)
		//removeMoleculeFromPlaylist(molecule, Playlist)
		//scheduleContent(Playlist, time, date)
		//uploadContent(Molecule)

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

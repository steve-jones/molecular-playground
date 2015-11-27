
var dbReader = require('./databaseReader.js');

module.exports = {
	createUser : function(firstName, lastName, username, password, email, role) {
			createUserParameterCheck(firstName, lastName, username, password, email, role);
			parameters = [firstName, lastName, username, password, email, role];
			dbReader.executeFunction('add_user', parameters); 

			// TODO: Throw exception if user already exists (email duplicate)
			// TODO: Throw exception for invalid role
	}
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

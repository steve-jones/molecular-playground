
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var crypto = require('./Local/encryption.js');

module.exports = {

	createUser: function(firstName, lastName, username, password, email, role) {
		if (!validateRole(role)) {
			// TODO: Return some sort of error to the caller
			console.log('User creation failed: Invalid RoleID: ' + String(role));
			return;
		}

		var encryptedPassword = crypto.encrypt(password);
		parameters = [firstName, lastName, username, encryptedPassword, email, role];
		dbFunctions.usernameExists(username, function(usernameExists) {
			if(usernameExists === 'false') {
				dbReader.executeFunction('add_user', parameters, function(err) {
					// log error
				});
			}
			else {
				// log error
				// TODO: Return some sort of error to the caller
				console.log("username exists");
			}
		});
	},

	getUser: function(username, callback) {
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				// log error
				throw "Cannot get user because user with username: " + username + " does not exist.";
			}
			else {
				dbReader.executeFunction('get_user_by_username', [username], function(userData, err) {
					// log error
					callback(userData[0]);
				});
			}
		});
	},

	updateEmail: function(username, newEmail) {
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				// log error
				throw "Cannot change email because user with username: " + username + " does not exist.";
			}
			else {
				dbReader.executeFunction('update_email', [username, newEmail], function(err) {
					// log error
				});
			}
		});
	},

	updatePassword: function(username, newPassword) {
		if (newPassword.length < 7) {
			// TODO: Return some sort of error to the caller
			console.log('Password must be at least 7 characters');
			return;
		}

		var newEncryptedPassword = crypto.encrypt(newPassword);
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				// log error
				throw "Cannot change password because user with username: " + username + " does not exist.";
			}
			else {
				dbReader.executeFunction('update_password', [username, newEncryptedPassword], function(err) {
					// log error
				});
			}
		});
	},

	updateRole: function(username, newRole) {
		if (!validateRole(newRole)) {
			// TODO: Return some sort of error to the caller
			console.log('Role update failed: Invalid RoleID: ' + String(newRole));
			return;
		}

		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				// log error
				throw "Cannot update role because user with username: " + username + " does not exist.";
			}
			else {
				dbReader.executeFunction('update_role', [username, newRole], function(err) {
					// log error
				});
			}
		});
	},

	deleteUser: function(username) {
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				// log error
				throw "Cannot delete user because user with username: " + username + " does not exist.";
			}
			else {
				dbReader.executeFunction('remove_user', [username], function(err) {
					// log error
				});
			}
		});
	}
};


function validateRole(role) {
	if (role < 0 || role > 4) {
		return false;
	}

	return true;
}


var dbReader = require('./Local/databaseReader.js');
var dbError = require('./errorAPI.js');
var dbFunctions = require('./Local/dbFunctions.js');
var crypto = require('./Local/encryption.js');
var DBError = require('./DBError.js');
var UserRole = require('../model/UserRole.js');

module.exports = {

	createUser: function(firstName, lastName, username, password, email, role, callback) {
		if (!validateRole(role)) {
			var error = new DBError(5);
			dbError.logError(error);
			callback(error);
		}

		var encryptedPassword = crypto.encrypt(password);
		parameters = [firstName, lastName, username, encryptedPassword, email, role];
		dbFunctions.usernameExists(username, function(usernameExists) {
			if(usernameExists === 'false') {
				dbReader.executeFunction('add_user', parameters, function(err) {
					callback(err);
				});
			}
			else {
				var error = new DBError(4);
				dbError.logError(error);
				callback(error);
			}
		});
	},

	getUser: function(username, callback) {
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				var error = new DBError(3);
				dbError.logError(error);
				callback(new DBError(3));
			}
			else {
				dbReader.executeFunction('get_user_by_username', [username], function(userData, err) {
					userData[0].password = crypto.decrypt(userData[0].password);
					callback(userData[0], new UserRole(userData[0].role));
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
			console.log('Role update failed: Invalid Role: ' + String(newRole));
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
	if (role === 'global_admin' || role === 'local_admin' || role === 'author' || role === 'delegate') {
		return true;
	}

	return false;
}

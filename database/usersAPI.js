
var dbReader = require('./Local/databaseReader.js');
var dbError = require('./errorAPI.js');
var dbFunctions = require('./Local/dbFunctions.js');
var crypto = require('./Local/encryption.js');
var DBError = require('./DBError.js');
var UserRole = require('../model/UserRole.js');

module.exports = {

	createUser: function(firstName, lastName, username, password, email, role, callback) {
		var encryptedPassword = crypto.encrypt(password);
		parameters = [firstName, lastName, username, encryptedPassword, email, role.getCode()];
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

	updateEmail: function(username, newEmail, callback) {
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				var error = new DBError(3);
				dbError.logError(error);
				callback(new DBError(3));
			}
			else {
				dbReader.executeFunction('update_email', [username, newEmail], function(err) {
					callback(null);
				});
			}
		});
	},

	updatePassword: function(username, newPassword, callback) {
		var newEncryptedPassword = crypto.encrypt(newPassword);
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				var error = new DBError(3);
				dbError.logError(error);
				callback(new DBError(3));
			}
			else {
				dbReader.executeFunction('update_password', [username, newEncryptedPassword], function(err) {
					callback(null);
				});
			}
		});
	},

	updateRole: function(username, newRole, callback) {
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				var error = new DBError(3);
				dbError.logError(error);
				callback(new DBError(3));
			}
			else {
				dbReader.executeFunction('update_role', [username, newRole], function(err) {
					callback(null);
				});
			}
		});
	},

	deleteUser: function(username, callback) {
		dbFunctions.usernameExists(username, function(usernameExists) {
			if (usernameExists === 'false') {
				var error = new DBError(3);
				dbError.logError(error);
				callback(new DBError(3));
			}
			else {
				dbReader.executeFunction('remove_user', [username], function(err) {
					callback(null);
				});
			}
		});
	}
};


var dbReader = require('./databaseReader.js');

module.exports = {
	usernameExists: function(username, callback) {
		dbReader.executeFunction('user_exists', username, function(userNameExists){
			if(userNameExists[0].user_exists === null){
				callback('false');
			}
			else{
				callback('true');
			}
		});
   	},

   	moleculeExists: function(moleculeID, callback) {
		dbReader.executeFunction('molecule_exists', moleculeID, function(moleculeExists){
			if(moleculeExists[0].molecule_exists === null){
				callback('false');
			}
			else{
				callback('true');
			}
		});
   	},

   	errorExists: function(errorID, callback) {
   		dbReader.executeFunction('error_exists', errorID, function(errorExists) {
   			if (errorExists[0].error_exists === null) {
   				callback('false');
   			}
   			else {
   				callback('true');
   			}
   		});
   	}
}

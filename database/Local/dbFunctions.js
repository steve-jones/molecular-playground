
var dbReader = require('./databaseReader.js');

module.exports = {
	usernameExists: function(username, callback) {
		dbReader.executeFunction('user_exists', username, function(userNameExists) {
			if(userNameExists[0].user_exists === null){
				callback('false');
			}
			else{
				callback('true');
			}
		});
   	},

   	installationExists: function(installation_id, callback) {
		dbReader.executeFunction('installation_exists', installation_id, function(installationExists){
			if(installationExists[0].installation_exists === null){
				callback('false');
			}
			else{
				callback('true');
			}
		});
   	},

   	playlistExists: function(playlist_id, callback) {
		dbReader.executeFunction('playlist_exists', playlist_id, function(playlistExists){
			if(playlistExists[0].playlist_exists === null){
				callback('false');
			}
			else{
				callback('true');
			}
		});
   	},

   	moleculeExists: function(moleculePath, callback) {
		dbReader.executeFunction('molecule_exists', moleculePath, function(moleculeExists, error) {
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

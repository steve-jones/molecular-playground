
var dbReader = require('./databaseReader.js');

module.exports = {
	usernameExists: function(username, callback) {
		if (dbReader.executeFunction('username_exists', parameters) != NULL){
			callback('false');
		}
		else{
			callback('true');
		}
   	}
}

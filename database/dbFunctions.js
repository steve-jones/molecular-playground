
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
   	}
}

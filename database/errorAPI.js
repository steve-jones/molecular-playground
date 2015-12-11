
var DBError = require('./DBError.js');
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');

module.exports = {

	logError: function(dbError, callback) {
		// log_error(error_code int, sec int, minu int, hr int, da int, mon int, yr int)
		var date = new Date();
		var seconds = date.getSeconds();
		var minute = date.getMinutes();
		var hour = date.getHours();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		dbReader.executeFunction('log_error', [dbError.getErrorCode(), seconds, minute, hour, day, month, year], function(err) {
			callback(err);
		});
	},

	getError: function(errorID, callback) {
		dbFunctions.errorExists(errorID, function(errorExists) {
			if (errorExists === 'false') {
				throw "Cannot get error because error with id: " + String(errorID) + " does not exist.";
			}
			else {
				dbReader.executeFunction('get_error', errorID, function(errorData, err) {
					callback(errorData[0], new DBError(errorData[0].code));
				});
			}
		});
	}
};
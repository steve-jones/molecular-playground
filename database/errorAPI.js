
var DBError = require('./Local/DBError.js');
var dbReader = require('./Local/databaseReader.js');

module.exports = {

	logError: function(dbError) {
		// log_error(error_code int, sec int, minu int, hr int, da int, mon int, yr int)
		var date = new Date();
		var seconds = date.getSeconds();
		var minute = date.getMinutes();
		var hour = date.getHours();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		dbReader.executeFunction('log_error', [dbError.code, seconds, minute, hour, day, month, year], function(err) {

		});
	}

};
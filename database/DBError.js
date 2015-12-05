
var Enum = require('enum');

const errorCodeEnum = new Enum({
	// Database connection error codes
	'No response from database' : 0,
	'Invalid database credentials' : 1,
	'Unable to connect to database' : 2,

	// User error codes
	'User does not exist' : 3,
	'User already exists' : 4,
	'Invalid role' : 5,

	// Molecule error codes
	'Molecule does not exist' : 6,

	// Playlist error codes
	'Playlist does not exist' : 7,


	// Installation error codes
	'Installation does not exist' : 8,
	'Local admin does not exist' : 9,
	'Delegate already exists' : 10,

	// Error Logging error codes
	'Error does not exist' : 11
});


// Constructor
function DBError(errorCode) {
	this.code = errorCode;
	try {
		this.description = errorCodeEnum.get(this.code).key;
	}
	catch (err) {
		throw "Invalid Error Code: " + String(this.code);
	}
}



// export the class
module.exports = DBError;

var Enum = require('enum');

var errorCodeEnum = new Enum({
	// Database connection error codes
	'No response from database' : 0,
	'Invalid database credentials' : 1,
	'Unable to connect to database' : 2,

	// User error codes
	'User does not exist' : 3,
	'a' : 4
});


// Constructor
function DBError(errorCode) {
	this.errorCode = errorCode;
	try {
		this.errorText = errorCodeEnum.get(errorCode).key;
	}
	catch (err) {
		throw "Invalid Error Code: " + String(errorCode);
	}
}



// export the class
module.exports = DBError;
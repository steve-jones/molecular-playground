
var Enum = require('enum');

var code = -1;
var description = "";

const roleEnum = new Enum({
	"Global Administrator" : 0,
	"Local Administrator" : 1,
	"Delegate" : 2,
	"Author" : 3
});


function UserRole(roleCode) {
	code = roleCode;
	try {
		description = roleEnum.get(code).key;
	}
	catch (err) {
		throw "Invalid Error Code: " + String(code);
	}
}

UserRole.prototype.GLOBAL_ADMIN = 0;
UserRole.prototype.LOCAL_ADMIN = 1;
UserRole.prototype.DELEGATE = 2;
UserRole.prototype.AUTHOR = 3;

UserRole.prototype.getCode = function(){
	return code;
}

UserRole.prototype.getDescription = function() {
	return description;
}

module.exports = UserRole;
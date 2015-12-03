#Database API

###The following are the list of functions, their parameters (in order), and return types exposed by the database API:

1. ***usersAPI:***
	* **createUser**
		* Parameters: (String) firstName, (String) lastName, (String) username, (String) password, (String) email, (Number) role
		* Returns: void
		* Throws: User already exists, Invalid Role, Unable to connect to db
	* **getUser**
		* Parameters: (String) userName, (Function) callback
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
		* Example Usage: getUser('jcalabro', function(userData) { console.log(userData[0].email); });
	* **updateEmail**
		* Parameters: (String) username, (String) newEmail
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
	* **updatePassword**
		* Parameters: (String) username, (String) newPassword
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
	* **updateRole**
		* Parameters: (String) username, (Number) newRole
		* Returns: void
		* Throws: User doesn't exist, Invalid role, Unable to connect to db
	* **updateRole**
		* Parameters: (String) username
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
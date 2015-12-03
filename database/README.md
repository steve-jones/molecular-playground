#Database API

###The following are the list of functions, their parameters (in order), return types, and callback functions exposed by the database API:


#####To use one of these functions, do:
```
var db = require('/path/to/file.js');

// example function call:
db.getUser(username, function(callback) {
	console.log(callback[0].firstName);
});
```


1. ***Users API:*** (~/database/usersAPI.js)
	* **createUser**
		* Parameters: (String) firstName, (String) lastName, (String) username, (String) password, (String) email, (Number) role
		* Returns: void
		* Throws: User already exists, Invalid Role, Unable to connect to db
	* **getUser**
		* Parameters: (String) userName, (Function) callback
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
		* Callback contains jsonized user data with parameters:
			* (Number) id
			* (String) firstName
			* (String) lastName
			* (String) uname
			* (String) password
			* (String) email
			* (Number) role
		* Example Usage: `getUser('jcalabro', function(userData) { console.log(userData.uname); });`
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


2. ***Molecule API*** (~/database/moleculeAPI.js)
	* **createMolecule** 
		* Parameters: (Number) creatorUserID, (String) moleculeName, (String) filepath, (Boolean) approvalStatus, (Function) callback
		* Returns: void
		* Throws: Unable to connect to db
		* Callback contains moleculeID (Number)
		* Example Usage: `createMolecule(3, 'New Molecule', '/path/to/file', false, function(moleculeID) { console.log(moleculeID); });`
	* **getMolecule**
		* Parameters: (Number) moleculeID
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
		* Callback contains jsonized molecule data with parameters (I'm sorray about the lower case, it is unavoidable):
			* (Number) moleculeid
			* (Number) creatorid
			* (String) name
			* (String) filepath
			* (Number) day
			* (Number) month
			* (Number) year
			* (Boolean) approvalstatus
		* Example Usage: `mol.getMolecule(12, function(molData) { console.log(molData); });`
	* **renameMolecule**
		* Parameters: (Number) moleculeID, (String) newName
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
	* **alterPath**
		* Parameters: (Number) moleculeID, (String) newPath
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
	* **setApprovalStatus**
		* Parameters: (Number) moleculeID, (Boolean) newApprovalStatus
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
	* **deleteMolecule**
		* Parameters: (Number) moleculeID
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
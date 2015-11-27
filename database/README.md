#Database API

###The following are the list of functions, their parameters, and return types exposed by the database API:

* **createUser**
	* Parameters: (String) firstName, (String) lastName, (String) username, (String) password, (String) email, (Number) role
	* Returns: (Number) newUserID
	* Throws: User already exists, Invalid Role, Unable to connect to db
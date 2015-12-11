#Database API

#####The following are the list of functions, their parameters (in order), return types, and callback functions exposed by the database API:

####Contents:
* [Usage](#usage)
* [Users API](#usersAPI)
* [Molecule API](#moleculeAPI)
* [Playlist API](#playlistAPI)
* [Installation API](#installationAPI)
* [Error Logging API](#errorAPI)
* [The DBError Object](#dbError)

<a name="usage"></a>

#####To use one of these functions, do:
```
var db = require('/path/to/file.js');

// example function call:
db.getUser(username, function(callback) {
	console.log(callback[0].firstName);
});
```





<a name="usersAPI"></a>

* ***Users API:*** (~/database/usersAPI.js)
	* **createUser**
		* Parameters: (String) firstName, (String) lastName, (String) username, (String) password, (String) email, (Number) role, (Function) callback[error]
		* Returns: void
		* Throws: User already exists, Invalid Role, Unable to connect to db
		* Callback contains:
			* Error information. If null, no error occured.
		* Notes:
			* Password will be encrypted before stored
		* Example usage:
		```
		db.createUser('First', 'Second', 'username', 'password', 'user@email.com', 1, function(error) {
			if (error != null) {
				// handle the error situationally
				console.log(error.getDescription());
			}
		});
		```
	* **getUser**
		* Parameters: (String) userName, (Function) callback[userData, userRole, error]
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
		* Callback contains:
			* Jsonized user data with parameters:
				* (Number) id
				* (String) firstName
				* (String) lastName
				* (String) uname
				* (String) password
				* (String) email
				* (Number) role
			* UserRole object
			* Error information. If null, no error occured. Additionally, if an error occured, the other callback parameters will be null.
		* Example Usage:
		```
		db.getUser('jcalabro', function(userData, userRole, error) {
			if (error == null) {
				console.log(userData.uname);
			}
		});
		```
	* **updateEmail**
		* Parameters: (String) username, (String) newEmail, (Function) callback[error]
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		* Example Usage:
		```
		db.updateEmail('jcalabro', 'newEmail@umass.edu', function(error) {
			console.log(error.getDescription());
		});
		```
	* **updatePassword**
		* Parameters: (String) username, (String) newPassword, (Function) callback[error]
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If null, there is no error.
		* Example Usage:
		```
		db.updatePassword('jcalabro', 'newPassword', function(error) {
			if (error != null) {
				console.log(error.getDescription());
			}
		});
		```
	* **updateRole**
		* Parameters: (String) username, (Number) newRole, (Function) callback[error]
		* Returns: void
		* Throws: User doesn't exist, Invalid role, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		* Example Usage:
		```
		db.updateRole('jcalabro', new UserRole(1), function(error) {
			if (error != null) {
				console.log(error.getDescription());
			}
		});
		```
	* **deleteUser**
		* Parameters: (String) username, (Function) callback[error]
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		* Example Usage:
		```
		db.deleteuser('jcalabro', function(error) {
			if (error != null) {
				console.log(error.getDescription()); 
			}
		});
		```


<a name="moleculeAPI"></a>

* ***Molecule API*** (~/database/moleculeAPI.js)
	* **createMolecule** 
		* Parameters: (Number) creatorUserID, (String) moleculeName, (String) filepath, (Boolean) approvalStatus, (Function) callback[moleculeID, error]
		* Returns: void
		* Throws: Unable to connect to db
		* Callback contains:
			* moleculeID (Number)
			* Error information. If callback is null, there is no error.
		* Example Usage:
		```
		db.createMolecule(3, 'New Molecule', '/path/to/file', false, function(moleculeID, error) {
			if (error == null) {
				console.log(moleculeID);
			}
		});
		```
	* **getMolecule**
		* Parameters: (Number) moleculeID, (Function) callback[moleculeData, error]
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
		* Callback contains:
			* jsonized molecule data with parameters (I'm sorry about the lower case, it is unavoidable):
				* (Number) moleculeid
				* (Number) creatorid
				* (String) name
				* (String) filepath
				* (Number) day
				* (Number) month
				* (Number) year
				* (Boolean) approvalstatus
			* Error information. If callback is null, there is no error.
		* Example Usage: 
		```
		db.getMolecule(12, function(moleculeData, error) {
			if (error == null) {
				console.log(moleculeData);
			}
		});
		```
	* ***getMolecules***
		* Parameters: (Function) callback[moleculeData, error]
		* Returns: void
		* Throws: Unable to connect to db
		* Callback contains:
			* jsonized molecule data array with parameters (I'm sorry about the lower case, it is unavoidable):
				* (Number) moleculeid
				* (Number) creatorid
				* (String) name
				* (String) filepath
				* (Number) day
				* (Number) month
				* (Number) year
				* (Boolean) approvalstatus
			* Error information. If callback is null, there is no error.
		* Example usage:
		```
		db.getMolecules(funtion (allMolecules) {
			allMolecules.forEach(function(moleculeData) {
				console.log(moleculeDate);
			});
		});
		```
	* **renameMolecule**
		* Parameters: (Number) moleculeID, (String) newName, (Function) callback[error]
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		* Example usage:
		```
		db.renameMolecule(123, 'New Name', function(error) {
			if (error != null) {
				// handle error
			}
		})
		```
	* **alterPath**
		* Parameters: (Number) moleculeID, (String) newPath, (Function) callback[error]
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		* Example Usage:
		```
		db.alterPath(123, '/New/Path/', function(error) {
			if (error != null) {
				// handle error
			}
		})
		```
	* **setApprovalStatus**
		* Parameters: (Number) moleculeID, (Boolean) newApprovalStatus, (Function) callback[error]
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		* Example Usage:
		```
		db.setApprovalStatus(123, true, function(error) {
			if (error != null) {
				// handle error
			}
		})
		```
	* **deleteMolecule**
		* Parameters: (Number) moleculeID, (Function) callback
		* Returns: void
		* Throws: Molecule doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		* Example Usage:
		```
		db.deleteMolecule(123, function(error) {
			if (error != null) {
				// handle error
			}
		})
		```


<a name="playlistAPI"></a>

* ***Playlist API*** (~/database/playlistAPI.js)
	* **createPlaylist**
		* Parameters: (String) playlistName, (Number) playlistCreator, (Number) installation
		* Returns: void
		* Throws: Unable to connect to db
	* **getPlaylists**
		* Parameters: (Function) callback
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
		* Callback contains:
			* array of all playlists
		* Example Useage: `db.getPlaylists(function(molecules) { for (var i = 0; i < molecules.length; ++i) { console.log(molecules[i]); } };`
	* **getPlaylist**
		* Parameters: (Number) playlistID, (Function) callback
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
		* Callback contains:
			* array of all playlists if error is null
			* Error information. If error is null, there is no error.
		* Example Useage: `db.getPlaylist(function(moleculeName, molecules) { console.log(molecules); };`
	* **removePlaylist**
		* Parameters: (Number) playlistID
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
	* **addMoleculeToPlaylist**
		* Parameters: (Number) playlistID, (Number) moleculeID
		* Returns: void
		* Throws: Playlist doesn't exist, Molecule doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
	* **removeMoleculeFromPlaylist**
		* Parameters: (Number) playlistID, (Number) moleculeID
		* Returns: void
		* Throws: Playlist doesn't exist, Molecule doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
	* **scheduleContent**
		* Parameters: (Number) playlistID, (Number) startTime, (Number) endTime, (Number) startDate, (Number) endDate (FIX THIS)
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.

<a name="installationAPI"></a>

* ***Installation API*** (~/database/installationAPI.js)
	* **addInstallation**
		* Parameters: (String) city, (String)country, (String) school_affiliation, (Number) local_admin_id, (Number) GPS_location_x, (Number) GPS_location_y
		* Returns: void
		* Throws: Local admin does not exist, Unable to connect to db	
		* Callback contains:
			* Error information. If callback is null, there is no error.
	* **getInstallations**
		* Parameters: (Function) callback
		* Returns: void
		* Throws: Installation doesn't exist, Unable to connect to db
		* Callback contains array of all installations
		* Example Useage: `db.getInstalltions(function(installations) { for (var i = 0; i < installations.length; ++i) { console.log(installations[i]); } };`
	* **deleteInstallation**
		* Parameters: (Number) installation_id
		* Returns: void
		* Throws: Installation doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
	* **disableInstallation**
		* Parameters: (Number) installation_id
		* Returns: void
		* Throws: Installation doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
	* **getLocalDelegates**
		* Parameters: (Function) callback
		* Returns: void
		* Throws: Installation doesn't exist, Unable to connect to db
		* Callback contains:
			 * array of all Local Administrator ID's if error doesn't exist
			 * Error information. If error is null, there is no error.
		* Example Useage: `db.getLocalDelegates(function(localAdminsIDs, err) { for (var i = 0; i < localAdminIDs.length; ++i) { console.log(localAdminIDs[i]); } };`
	* **addLocalDelegate**
		* Parameters: (Number) installation_id, (String) firstName, (String) lastName, (String) username, (String) password, (String) email, (Number) role
		* Returns: void
		* Throws: Delegate already exists, Installation doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
	* **removeLocalDelegate**
		* Parameters: (String) username, (Number) installation_id, (Number) delegate_id
		* Returns: void
		* Throws: Delegate doesn't exist, Installation doesn't exist, Unable to connect to db
		* Callback contains:
			* Error information. If callback is null, there is no error.
		
<a name="errorAPI"></a>

* ***Error Logging API*** (~/database/errorAPI.js)
	* **logError**
		* Parameters: (DBError) dbError
		* Returns: void
		* Throws: Unable to connect to db	
	* **getError**
		* Parameters: (Number) errorID, (Function) callback
		* Returns: void
		* Throws: Error doesn't exist, Unable to connect to db
		* Callback contains jsonized  error data with parameters (below) and a reference DBError object for convenience
			* (Number) errorid
			* (Number) code
			* (Number) second
			* (Number) minute
			* (Number) hour
			* (Number) day
			* (Number) month
			* (Number) year
		* Example Useage: `db.getError(12, function(errorData, dbObject) { console.log(errorData); console.log(dbObject.getDescription()); });`

<a name="dbError"></a>

* ***The DBError Object*** (~/database/DBError.js)
	* Constructor: (Number) errorCode
	* Public Methods:
		* getErrorCode()
			* Returns: the error code of this DBError object
		* getDescription()
			* Returns: the description of this DBError object
	* Notes: The DBError object is used to map error codes to human-readable error descriptions. It is passed to the `logError(DBError)` function. As time goes on, if error codes are added, the codes will extend towards infinity, leaving all existing error codes constant. 
	* Example Usage:
		```
		var DBError = require('../database/DBError.js');
		var error = new DBError(3);
		console.log(error.getErrorCode());
		console.log(error.getDescription());

		var errorLog = require('../database/errorAPI.js');
		errorLog.logError(error);
		```
	* Error Code Table:
	
		| Error Code  | Description                       |
		| ----------- | ----------------------------------|
		| 0           | No response from database         |
		| 1           | Invalid database credentials      |
		| 2           | Unable to connect to database     |
		| 3           | User does not exist               |
		| 4           | User already exists               |
		| 5           | Invalid Role                      |
		| 6           | Molecule does not exist           |
		| 7           | Playlist does not exist           |
		| 8           | Installation does not exist       |
		| 9           | Local admin does not exist        |
		| 10          | Delegate already exists           |
		| 11          | Error does not exist              |
		| 12          | Invalid DBError Code              |
		| 13          | Undefined Error                   |
		| 14          | DelegateID does not match userID  |
		| 15          | Molecule Already Exists           |



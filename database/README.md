#Database API

#####The following are the list of functions, their parameters (in order), return types, and callback functions exposed by the database API:

####Contents:
* [Usage](#usage)
* [Users API](#usersAPI)
* [Molecule API](#moleculeAPI)
* [Playlist API](#playlistAPI)
* [Installation API](#installationAPI)
* [Error Logging API](#errorAPI)

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
		* Example Usage: `db.getUser('jcalabro', function(userData) { console.log(userData.uname); });`
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
	* **deleteUser**
		* Parameters: (String) username
		* Returns: void
		* Throws: User doesn't exist, Unable to connect to db


<a name="moleculeAPI"></a>

* ***Molecule API*** (~/database/moleculeAPI.js)
	* **createMolecule** 
		* Parameters: (Number) creatorUserID, (String) moleculeName, (String) filepath, (Boolean) approvalStatus, (Function) callback
		* Returns: void
		* Throws: Unable to connect to db
		* Callback contains moleculeID (Number)
		* Example Usage: `db.createMolecule(3, 'New Molecule', '/path/to/file', false, function(moleculeID) { console.log(moleculeID); });`
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
		* Example Usage: `db.getMolecule(12, function(molData) { console.log(molData); });`
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


<a name="playlistAPI"></a>

* ***Playlist API*** (~/database/playlistAPI.js)
	* **createPlaylist**
		* Parameters: (String) playlistName, (Number) playlistCreator, (Number) installation
		* Returns: void
		* Throws: Any molecule doesn't exist, Installation doesn't exist, Unable to connect to db
	* **getPlaylists**
		* Parameters: (Function) callback
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
		* Callback contains array of all playlists
		* Example Useage: `db.getPlaylists(function(molecules) { for (var i = 0; i < molecules.length; ++i) { console.log(molecules[i]); } };`
	* **getPlaylist**
		* Parameters: (Number) playlistID, (Function) callback
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
		* Callback contains array of all playlists
		* Example Useage: `db.getPlaylist(function(moleculeName, molecules) { console.log(molecules); };`
	* **removePlaylist**
		* Parameters: (Number) playlistID
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
	* **addMoleculeToPlaylist**
		* Parameters: (Number) playlistID, (Number) moleculeID
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
	* **removeMoleculeFromPlaylist**
		* Parameters: (Number) playlistID, (Number) moleculeID
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db
	* **scheduleContent**
		* Parameters: (Number) playlistID, (Number) startTime, (Number) endTime, (Number) startDate, (Number) endDate (FIX THIS)
		* Returns: void
		* Throws: Playlist doesn't exist, Unable to connect to db

<a name="installationAPI"></a>

* ***Installation API*** (~/database/installationAPI.js)
	* **addInstallation**
		* Parameters: (String) city, (String)country, (String) school_affiliation, (Number) local_admin_id, (Number) GPS_location_x, (Number) GPS_location_y
		* Returns: void
		* Throws: Local admin does not exist, Unable to connect to db	
	* **getInstallations**
		* Parameters: (Function) callback
		* Returns: void
		* Throws: Installation doesn't exist, Unable to connect to db
		* Callback contains array of all installations
		* Example Useage: `db.getInstalltions(function(installations) { for (var i = 0; i < installations.length; ++i) { console.log(installations[i]); } };`
	* **deleteInstallation**
		* Parameters: (Number) installation_id
		* Returns: void
		* Throws: installation doesn't exist, Unable to connect to db
	* **disableInstallation**
		* Parameters: (Number) installation_id
		* Returns: void
		* Throws: installation doesn't exist, Unable to connect to db
	* **getLocalDelegates**
		* Parameters: (Function) callback
		* Returns: void
		* Throws: Installation doesn't exist, Unable to connect to db
		* Callback contains array of all Local Administrator ID's
		* Example Useage: `db.getLocalDelegates(function(localAdminsIDs) { for (var i = 0; i < localAdminIDs.length; ++i) { console.log(localAdminIDs[i]); } };`
	* **addLocalDelegate**
		* Parameters: (Number) installation_id, (String) firstName, (String) lastName, (String) username, (String) password, (String) email, (Number) role
		* Returns: void
		* Throws: User already exists, Installation doesn't exist, Unable to connect to db
	* **removeLocalDelegate**
		* Parameters: (String) username, (Number) installation_id, (Number) delegate_id
		* Returns: void
		* Throws: User doesn't exist, Installation doesn't exist, Unable to connect to db
		
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
		* Callback contains jsonized  error data with parameters;
			* (Number) errorid
			* (Number) code
			* (Number) second
			* (Number) minute
			* (Number) hour
			* (Number) day
			* (Number) month
			* (Number) year
		* Example Useage: `db.getError(12, function(errorData) { console.log(errorData); });`


var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var crypto = require('./Local/encryption.js');

module.exports = {

	createMolecule: function(creatorUserID, moleculeName, filepath, approvalStatus, callback) {
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		parameters = [creatorUserID, moleculeName, filepath, day, month, year, approvalStatus];
		dbReader.executeFunction('create_molecule', parameters, function(moleculeID, err) {
			// log error
			callback(moleculeID[0].create_molecule);
		});
	},

	getMolecule: function(moleculeID, callback) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				throw "Cannot get molecule because molecule with id: " + moleculeID + " does not exist.";
			}
			else {
				dbReader.executeFunction('get_molecule', moleculeID, function(moleculeData, err) {
					// log error
					callback(moleculeData);
				});
			}
		})
	},

	renameMolecule: function(moleculeID, newName) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				throw "Cannot rename molecule because molecule with id: " + moleculeID + " does not exist.";
			}
			else {
				dbReader.executeFunction('rename_molecule', [moleculeID, newName], function(err) {
					// log error
				});
			}
		});
	},

	alterPath: function(moleculeID, newPath) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				throw "Cannot alter path because molecule with id: " + moleculeID + " does not exist.";
			}
			else {
				dbReader.executeFunction('change_path', [moleculeID, newPath], function(err) {
					// log error
				});
			}
		});
	},

	setApprovalStatus: function(moleculeID, approvalStatus) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				throw "Cannot set approval status because molecule with id: " + moleculeID + " does not exist.";
			}
			else {
				dbReader.executeFunction('change_approval_status', [moleculeID, approvalStatus], function(err) {
					// log error
				});
			}
		});
	},

	deleteMolecule: function(moleculeID) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				throw "Cannot delete molecule because molecule with id: " + moleculeID + " does not exist.";
			}
			else {
				dbReader.executeFunction('delete_molecule', [moleculeID], function(err) {
					// log error
				});
			}
		});
	}
}
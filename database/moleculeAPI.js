
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var errorDB = require('./errorAPI.js');

module.exports = {

	createMolecule: function(creatorUserID, moleculeName, filepath, approvalStatus, callback) {
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		parameters = [creatorUserID, moleculeName, filepath, day, month, year, approvalStatus];

		dbFunctions.moleculeExists(filepath, function(moleculeExists) {
			if (moleculeExists === 'true') {
				var error = new DBError(15);
				errorDB.logError(error, function(error) {
				});
				callback(null, error);
			}
			else {
				dbReader.executeFunction('create_molecule', parameters, function(moleculeID, err) {
					callback(moleculeID[0].create_molecule, err);
				});
			}
		});

	},

	getMolecule: function(moleculeID, callback) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				var error = new DBError(6);
				dbError.logError(error, function(err) {
				});
				callback(null, error);
			}
			else {
				dbReader.executeFunction('get_molecule', moleculeID, function(moleculeData, err) {
					callback(moleculeData[0], err);
				});
			}
		})
	},
	
	getMolecules: function(callback) {
		dbReader.executeFunction('get_molecules', '', function(moleculeData, err) {
			callback(moleculeData, err);
		});
	},

	renameMolecule: function(moleculeID, newName, callback) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				var error = new DBError(6);
				dbError.logError(error, function(err) {
				});
				callback(error);
			}
			else {
				dbReader.executeFunction('rename_molecule', [moleculeID, newName], function(err) {
					callback(err);
				});
			}
		});
	},

	alterPath: function(moleculeID, newPath, callback) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				var error = new DBError(6);
				dbError.logError(error, function(err) {
				});
				callback(error);
			}
			else {
				dbReader.executeFunction('change_path', [moleculeID, newPath], function(err) {
					callback(err);
				});
			}
		});
	},

	setApprovalStatus: function(moleculeID, newApprovalStatus, callback) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				var error = new DBError(6);
				dbError.logError(error, function(err) {
				});
				callback(error);
			}
			else {
				dbReader.executeFunction('change_approval_status', [moleculeID, newApprovalStatus], function(err) {
					callback(err);
				});
			}
		});
	},

	deleteMolecule: function(moleculeID, callback) {
		dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
			if (moleculeExists === 'false') {
				var error = new DBError(6);
				dbError.logError(error, function(err) {
				});
				callback(error);
			}
			else {
				dbReader.executeFunction('delete_molecule', [moleculeID], function(err) {
					callback(err);
				});
			}
		});
	}
}

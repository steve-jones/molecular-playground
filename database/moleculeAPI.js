
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var crypto = require('./Local/encryption.js');

module.exports = {

	createMolecule: function(creatorUserID, moleculeName, filepath, pendingApproval) {
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		parameters = [creatorUserID, moleculeName, filepath, day, month, year, pendingApproval];
		dbReader.executeFunction('create_molecule', parameters, function(err) {
			// log error
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
		dbReader.executeFunction('rename_molecule', [moleculeID, newName], function(err) {
			// log error
		});
	},

	alterPath: function(moleculeID, newPath) {
		dbReader.executeFunction('change_path', [moleculeID, newPath], function(err) {
			// log error
		});
	}
}
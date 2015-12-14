var dbError = require('./errorAPI.js');
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var dbUser = require('./usersAPI.js');
var DBError = require('./DBError.js');

module.exports = {
	getInstallations : function (callback){
		dbReader.executeFunction('get_installations', '', function(installations){
			callback(installations);
		});
	},

	addInstallation : function (city, country, school_affiliation, local_admin_id, GPS_location_x, GPS_location_y, callback){
		var date = new Date();
		var day = date.getDate();
		parameters = [city, country, school_affiliation, local_admin_id, '{}', true, day,
		GPS_location_x, GPS_location_y];
		dbReader.executeFunction('add_installation', parameters, function(data,err){
			callback(data, err);
		});

	},

	deleteInstallation : function(installation_id, callback){
		dbFunctions.installationExists(installation_id, function(installationExists) {
			if (installationExists === 'false') {
				var error = new DBError(8);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(8));
			}
			else {
				dbReader.executeFunction('delete_installation', installation_id, function(){
				});
			}
		});
	},

	disableInstallation : function(installation_id, callback){
		dbFunctions.installationExists(installation_id, function(installationExists) {
			if (installationExists === 'false') {
				var error = new DBError(8);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(8));
			}
			else {
				dbReader.executeFunction('disable_installation', installation_id, function(){
				});
			}
		});
	},

	getLocalDelegates : function(installation_id, callback){
		dbFunctions.installationExists(installation_id, function(installationExists) {
			if (installationExists === 'false') {
				var error = new DBError(8);
				dbError.logError(error, function(err) {
				});
				callback(null, new DBError(8));
			}
			else {
				dbReader.executeFunction('get_local_delegates', installation_id, function(allDelegates){
					callback(allDelegates, null);
				});
			}
		});
	},

	addLocalDelegate : function(installation_id, firstName, lastName, username, password, email, role, callback){

		dbFunctions.installationExists(installation_id, function(installationExists) {
			if (installationExists === 'false') {
				var error = new DBError(8);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(8));
			}
			else {
				dbUser.createUser(firstName, lastName, username, password, email, role, function(err){
					if(err === null){
						dbUser.getUser(username,function(userData){
							var userID = userData.id;
							parameters = [installation_id, userID];
							dbReader.executeFunction('add_local_delegate', parameters, function(){
							});
						});
					}
					else{
						callback(err);
					}
				});
			}
		});
	},

	removeLocalDelegate : function(installation_id, delegate_id, delegate_username, callback){
		parameters = [installation_id, delegate_id];

		dbFunctions.installationExists(installation_id, function(installationExists) {
			if (installationExists === 'false') {
				var error = new DBError(8);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(8));
			}
			else {
				dbReader.executeFunction('remove_local_delegate', parameters, function(){
					dbUser.getUser(delegate_username, function(userData, userRole, userError){
						if(userError === null){
							if(userData.id === delegate_id){
								dbUser.deleteUser(delegate_username, function(err){
									callback(err);
								});
							}
							else{
								var error = new DBError(14);
								dbError.logError(error, function(err) {
								});
								callback(new DBError(14));
							}
						}
						else{
							callback(userError);
						}
					});
				});
			}
		});
	}

}

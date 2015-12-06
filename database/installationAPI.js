
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var dbUser = require('./usersAPI.js');
var crypto = require('./Local/encryption.js');

module.exports = {
	getInstallations : function (callback){
		dbReader.executeFunction('get_installations', '', function(installations){
			callback(installations);
		});
	}, 

	addInstallation : function (city, country, school_affiliation, local_admin_id, GPS_location_x, GPS_location_y){
		var date = new Date();
		var day = date.getDate();
		parameters = [city, country, school_affliation, local_admin_id, {}, true, day,
		GPS_location_x, GPS_location_y];
		dbReader.executeFunction('add_installation', parameters, function(){
		});
	} 

	deleteInstallation : function(installation_id){
		dbreader.executeFunction('delete_installation', installation_id, function(){
		});
	}

	disableInstallation : function(installation_id){
		dbreader.executeFunction('disable_installation', installation_id, function(){
		});
	}

	getLocalDelegates : function(installation_id, callback){
		dbreader.executeFunction('get_local_delegates', installation_id, function(allDelegates){
			callback(allDelegates);
		});
	}

	updateLocalAdmin : function(installation_id, new_local_admin_id){
		parameters = [installation_id, new_local_admin_id]
		dbreader.executeFunction('update_local_admin', parameters, function(){
		});
	}

	addLocalDelegate : function(installation_id, firstName, lastName, username, password, email, role){
		dbUser.createUser(firstName, lastName, username, password, email, role, function(err){
			dbUser.getUser(username,function(userData){
				var userID = userData[0].id;
				dbreader.executeFunction('add_local_delegate', userID, function(){
				});
			});
		});
	}

	removeLocalDelegate : function(installation_id, delegate_id, delegate_username){
		parameters = [installation_id, delegate_id];
		dbreader.executeFunction('remove_local_delegate', parameters, function(){	
			dbUser.deleteUser(delegate_username);
		});
	}

}	
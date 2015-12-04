
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var crypto = require('./Local/encryption.js');

module.exports = {
	getInstallations : function (callback){
		dbReader.executeFunction('get_installations', '', function(installations){
			callback(installations);
		});
	}, 

	addInstallation : function (city, country, school_affiliation, local_admin_id, GPS_location_x, GPS_location_y){
		//define date
		parameters = [city, country, school_affliation, local_admin_id, {}, true, date, GPS_location_x, GPS_location_y];
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


}	
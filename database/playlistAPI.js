
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');
var dbError = require('./errorAPI.js');
var DBError = require('./DBError.js');

module.exports = {

	createPlaylist : function(playlistName, playlistCreator, installation){
		parameters = [playlistName, playlistCreator, [0], installation, -1, -1, -1, -1, false];
		dbReader.executeFunction('create_playlist', parameters, function(err){
		});
	},

	getPlaylists : function(callback){
		dbReader.executeFunction('get_playlist', '',function(playlists){
			callback(playlists);
		});
     },

	getPlaylist : function(playlistID, callback){
		dbFunctions.playlistExists(playlistID, function(playlistExists) {
			if (playlistExists === 'false') {
				var error = new DBError(7);
				dbError.logError(error, function(err) {
				});
				callback(null, new DBError(7));
			}
			else {
				dbReader.executeFunction('get_specific_playlist', playlistID, function(playlist){
					callback(playlist, null);
				});
			}
		});	
	},

	removePlaylist : function(playlistID, callback){
		dbFunctions.playlistExists(playlistID, function(playlistExists) {
			if (playlistExists === 'false') {
				var error = new DBError(7);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(7));
			}
			else {
				dbReader.executeFunction('remove_playlist', playlistID, function(err){
					callback(err);
				});
			}
		});
	},

	addMoleculeToPlaylist : function(playlistID, moleculeID, callback){
		parameters = [playlistID, moleculeID];
		dbFunctions.playlistExists(playlistID, function(playlistExists) {
			if (playlistExists === 'false') {
				var error = new DBError(7);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(7));
			}
			else {
				dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
					if (moleculeExists === 'false') {
						var error = new DBError(6);
						dbError.logError(error, function(err) {
						});
						callback(new DBError(6));
					}
					else {
						dbReader.executeFunction('add_to_playlist', parameters, function(err){
						});
					}
				});		
			}
		});		
	},

	removeMoleculeFromPlaylist : function(playlistID, moleculeID, callback){
		parameters = [playlistID, moleculeID];
		dbFunctions.playlistExists(playlistID, function(playlistExists) {
			if (playlistExists === 'false') {
				var error = new DBError(7);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(7));
			}
			else {
				dbFunctions.moleculeExists(moleculeID, function(moleculeExists) {
					if (moleculeExists === 'false') {
						var error = new DBError(6);
						dbError.logError(error, function(err) {
						});
						callback(new DBError(6));
					}
					else {
						dbReader.executeFunction('remove_molecule_from_playlist', parameters, function(err){
						});	
					}
				});		
			}
		});	
	},

	scheduleContent : function(playlistID, startTime, endTime, startDate, endDate, callback){
		parameters = [playlistID, startTime, endTime, startDate, endDate];
		dbFunctions.playlistExists(playlistID, function(playlistExists) {
			if (playlistExists === 'false') {
				var error = new DBError(7);
				dbError.logError(error, function(err) {
				});
				callback(new DBError(7));
			}
			else {
				dbReader.executeFunction('schedule_content', parameters, function(err){
					callback(err);
				});
			}
		});		
	}


 }
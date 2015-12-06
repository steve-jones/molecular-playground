
var dbReader = require('./Local/databaseReader.js');
var dbFunctions = require('./Local/dbFunctions.js');

module.exports = {

	createPlaylist : function(playlistName, playlistCreator, installation){
		parameters = [playlistName, playlistCreator, [0], installation, -1, -1, -1, -1, false];
		dbReader.executeFunction('create_playlist', parameters, function(err){

		});
	},

	//returns an array of JSON objects of all playlists using a callback
	getPlaylists : function(callback){
		dbReader.executeFunction('get_playlist', '',function(playlists){
			callback(playlists);
		});
     },

	getPlaylist : function(playlistID, callback){
		dbReader.executeFunction('get_specific_playlist', playlistID, function(playlist){
			callback(playlist[0]);
		});
	},

	removePlaylist : function(playlistID){
		dbReader.executeFunction('remove_playlist', playlistID, function(err){
			
		});
	},

	//add molecule to playlist
	addMoleculeToPlaylist : function(playlistID, moleculeID){
		parameters = [playlistID, moleculeID];
		dbReader.executeFunction('add_to_playlist', parameters, function(err){

		});
	},

	removeMoleculeFromPlaylist : function(playlistID, moleculeID){
		parameters = [playlistID, moleculeID];
		dbReader.executeFunction('remove_molecule_from_playlist', parameters, function(err){

		});
	},

	// all of these parameters should have a value
	scheduleContent : function(playlistID, startTime, endTime, startDate, endDate){
		parameters = [playlistID, startTime, endTime, startDate, endDate];
		dbReader.executeFunction('schedule_content', parameters, function(err){

		});
	}


 }
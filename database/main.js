var db = require('./Local/dbFunctions.js');

db.moleculeExists(5, function (callback) {
	console.log(callback);
});

console.log('Done');
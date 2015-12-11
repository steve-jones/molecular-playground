
var pgp = require('pg-promise')();
var DBError = require('../DBError.js');

var cn = {
    host: 'ec2-54-83-201-196.compute-1.amazonaws.com',
    port: 5432,
    database: 'dbmsfuvsf87gr3',
    user: 'rawggbwzgenyfg',
    password: 'B7I3FmqSf73ZOj8kyHLmJcW1Ie',
    ssl: 'true',
    sslfactory: 'org.postgresql.ssl.NonValidatingFactory'
};

var db = pgp(cn);

module.exports = {
	executeFunction: function(functionName, parameters, callback) {
		if(parameters != ''){
			db.func(functionName, parameters)
		   	.then(function (data) {
		    	callback(data, null);
		   	})
		   	.catch(function (error) {
          		callback(null, new DBError(2));
		   	});
		}
		else{
			db.func(functionName)
		   	.then(function (data) {
		    	callback(data, null);
		   	})
		   	.catch(function (error) {
            	callback(null, new DBError(2));
		   	});
		}
	}
}

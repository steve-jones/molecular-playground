var pgp = require('pg-promise')();

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
	executeFunction: function(functionName, parameters) {
		db.func(functionName, parameters)
		   .then(function (data) {
		   		console.log(data);
		    	return data;
		   })
		   .catch(function (error) {
		   		// TODO: Find a better way to log errors
	        	console.log(error);
		   });
	},

	usernameExists: function(username, callback) {
		console.log(username);
                db.query("select username from users where username = '$s'".replace('$s',username))
                   .then(function(data){
			console.log("username " + username);
                        if(data[0] === undefined){
				console.log("false");
                                callback('false');
                        }
                        else{
                                callback('true');
                        }
                   })
                   .catch(function (error) {
                               // TODO: Find a better way to log errors
                        console.log(error);
                   });
       }


}


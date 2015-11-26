
var pgp = require('pg-promise')();

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'molecularplaygroundexpansion',
    user: 'postgres',
    password: 'admin'
};

var db = pgp(cn);


function createNewUser(firstName, lastName, password, email, role, username){
  
   db.query("select username from users where username = '$s'".replace('$s',username))
        .then(function(data){
//	console.log(data[0].username)
	if(data[0] === undefined){
           db.none("insert into users(firstName, lastName, password, email, role,"+
		"username) values($1, $2, $3, $4, $5, $6)", 
		[firstName, lastName, password, email, role, username])
	 	.then(function(){
		console.log("success");
		db.query("select * from users")
        		.then(function(data){
                		console.log(data);
       			})
		        .catch(function(error){

		        });

		})
		.catch(function(error){
			console.log(error);
		});
	}
	else{
	    console.log("already in db");
	}
	})
	.catch(function(error){
		console.log(error);
	});
}

createNewUser("Gordon", "anderson", "320", "gman@320.com", "Admin to the max", "the man");
//db.query("select * from test")
//	.then(function(data){
//		console.log(data);
//	})
//	.catch(function(error){
//
//	});

//db.func('make_user', ['James Calabro', 21])
//    .then(function (data) {
//        console.log(data); // printing the data returned
//    })
//    .catch(function (error) {
//        console.log(error); // printing the error
//    });


console.log('\nDone');

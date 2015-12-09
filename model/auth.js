var pg = require('pg');
var fs = require('fs');



//local db , turn this on if you want to work offline
// you will need to load the local db script first
var connString = 'postgres://test:password@localhost/molecular_db';


//==========================================================
// export the names of the functions so all functions in this doc have full scope with self


//Returns course specified by courseid
exports.login = login;


//Returns course specified by courseid
function login(name,password, callback) {
  return "username test"
}

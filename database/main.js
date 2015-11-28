var db = require('./dbAPI.js');

db.createUser('test', 'test', 'newAccount', 'password', 'ganderson@umass.edu', 6);

console.log("Done");
return;

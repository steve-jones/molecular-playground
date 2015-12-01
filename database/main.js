
var db = require('./dbAPI.js');

db.createUser('test', 'test', '1', 'password', 'ganderson@umass.edu', 6);
//db.removeUser('2');

console.log("Done");
return;

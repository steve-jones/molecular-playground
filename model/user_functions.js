var pg = require('pg');
var fs = require('fs');


//blank db link created for this project on my account -Yong
//var connString = 'postgres://test:12345678@ct2bdiqosbcm.us-east-1.rds.amazonaws.com:5432/test

//using terminal to connect for debugging
//psql --host=test.ct2bdiqosbcm.us-east-1.rds.amazonaws.com --port=5432 --username=test --password --dbname=test


//local db , turn this on if you want to work offline
// you will need to load the local db script first
var connString = 'postgres://test:test@localhost/molecular_db';


//==========================================================
// export the names of the functions so all functions in this doc have full scope with self

//Enrolls a student in a course for a given term
exports.enroll = enroll;

//========================================================

//Enrolls a student in a course for a given term
function enroll(studentid, courseid, term, instructor, callback) {
  pg.connect(connString, function (err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
      client.query('insert into studentschedule values (\''
        + studentid + '\', \''
        + courseid + '\', \''
        + term + '\', \''
        + instructor + '\');'
      , function(err, result) {
        done();
        client.end();
        if(err) {
          callback(err);
        }
        else {
          callback(undefined, result);
        }
      });
    }
  }); 
}

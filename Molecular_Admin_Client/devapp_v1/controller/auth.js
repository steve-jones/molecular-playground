var pg = require('pg');
var fs = require('fs');


//blank db link created for this project on my account -Yong
//var connString = 'postgres://test:12345678@ct2bdiqosbcm.us-east-1.rds.amazonaws.com:5432/test'

//using terminal to connect for debugging
//psql --host=test.ct2bdiqosbcm.us-east-1.rds.amazonaws.com --port=5432 --username=test --password --dbname=test


//local db , turn this on if you want to work offline
// you will need to load the local db script first
var connString = 'postgres://test:password@localhost/molecular_db';


//==========================================================
// export the names of the functions so all functions in this doc have full scope with self


//Returns course specified by courseid
exports.getCourse = getCourse;


//Returns course specified by courseid
function getCourse(courseid, callback) {
  var querystring ='';
  if (courseid ==="all"){
    querystring = 'select * from coursecatalog ;';
  }
  else{
    querystring = 'select * from coursecatalog where coursenumber =\'' + courseid + '\';';
  }

    pg.connect(connString, function(err, client, done) {
    if(err) {
      callback(err);
    }
    else {
      client.query(querystring, function(err, result) {
          done();
          client.end();
          if(err) {
            console.log(err);
          }
          else {
            //NOTE: returns '[]' if coursenumber does not exist
            var data = JSON.stringify(result.rows);
            callback(undefined, data);
          }
        });
    }
  });
}

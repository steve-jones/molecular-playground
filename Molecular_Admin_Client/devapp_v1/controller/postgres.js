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


//Enrolls a student in a course for a given term
exports.enroll = enroll;

//Adds user to database
//User info specified by arguments, gpa initialized to 0.0
exports.addNewUser = addNewUser;

//Returns json for student if exists, or else returns the string '[]'
exports.getUser = getUser;

//Adds new course to coursecatalog
exports.addNewCourse = addNewCourse;

//Returns course specified by courseid
exports.getCourse = getCourse;

//Sets prereqid as a prerequisite for the course specified by courseid
exports.addNewPrereq = addNewPrereq;

//Returns prerequisites for classes specified by classid
exports.getPrereqs = getPrereqs;


//========================================================
exports.getRecords = function(city, callback) {
  var sql = "SELECT name FROM users WHERE city=?";
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, [city], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};

//Enrolls a student in a course for a given term
function enroll(studentid, courseid, term, instructor, callback) {
  pg.connect(connString, function (err, callback) {
    if(err) {
	console.log("error in retrieving")
      callback('Server Error: ' + err);
    }
    else {
      client.query('insert into studentschedule values (\''
        + studentid + '\', \''
        + courseid + '\', \''
        + term + '\', \''
        + instructor + '\');'
      , function(err, result) {
       client.release();
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






//Adds user to database
//User info specified by arguments, gpa initialized to 0.0
function addNewUser(id, password, fname, lname, year, schoolorg, gpa, track, callback, counter) {

	if(counter === undefined) {
	counter = 0;
	}
  pg.connect(connString, function (err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
      client.query('insert into students values (\'' 
        + id + '\', \''
        + password + '\', \''
        + fname + '\', \''
        + lname 
        + '\', \''
        + year + '\', \''
        + schoolorg + '\', '
        + gpa + ', \'' + track + '\');'
      , function(err, result) {
        done();
        if(err) {
          callback(err);
        }
        else {
          if(counter <= 0) {
              setTimeout(function(){ 
              //client.end();
              console.log("Load students from csv completed!!\n");
              }, 2000);
          }
          callback(undefined, 'Success!\n');
        }
      });
    }
  });
}




//Returns json for student if exists, or else returns the string '[]'
function getUser(id, table, callback) {
  var querystring = '';
  if (table === 'students'){
  querystring = 'select * from students where id=\'' + id + '\';' ;
  }
  else{
  querystring = 'select * from admins where id=\'' + id + '\';' ;
  }

  pg.connect(connString, function (err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
        client.query(querystring, function(err, result) {
        done();
        client.end();
        if(err) {
          console.log('Error: ' + err);
          callback(err);
        }
        else {
          //NOTE: returns '[]' if user does not exist
          var data = JSON.stringify(result.rows);
          callback(undefined, data);
        }
      });
    }
  });
}




//Adds new course to coursecatalog
//NOTE: if multiple prereqs, list them in one string separated by a space
function addNewCourse(coursenum, name, credits, term, instructor, prereqs, callback, counter) {
  pg.connect(connString, function(err, client, done) {
    if(err) {
      callback(err);
    }
    else {
      //Add New Course information
        var querystring = 'insert into coursecatalog values (\'' 
          + coursenum + '\', \''
          + name + '\', \''
          + credits + '\', \''
          + term + '\', \''
          + instructor + '\');';
        client.query(querystring, function(err, result) {
          done();
          if(err) {
            callback(err);
          }
          else {
            if(counter <= 0) {
		          setTimeout(function(){ 
              client.end();
              console.log("Load courses from csv completed!!\n");
              }, 2000);
            }
            callback(undefined, 'Success!\n');
          } 
        });
    }
  });
}



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




//Sets prereqid as a prerequisite for the course specified by courseid
function addNewPrereq(courseid, prereqid, callback) {
  pg.connect(connString, function(err, client, done) {
    if(err) {
      callback(err);
    }
    else {
      //TODO: create querystring
      var querystring = 'insert into prerequisites values (\'' + courseid + '\', \'' + prereqid + '\');';

      client.query(querystring
        , function(err, result) {
          done();
          client.end();
          if(err) {
            callback(err);
          }
          else {
            callback(undefined, 'Success!\n');
          }
        });
    }
  });
}




//Returns prerequisites for classes specified by classid
function getPrereqs(classid, callback) {
  pg.connect(connString, function(err, client, done) {
    if(err) {
      callback('Server Error: ' + err);
    }
    else {
      client.query('select prereq from prerequisites where coursenumber =\'' + classid + '\';'
        , function(err, result) {
          done();
          client.end();
          if(err) {
            console.log(err);
            callback(err);
          }
          else {
            //NOTE: returns '[]' if coursenumber does not exist or if no prereqs
            var data = JSON.stringify(result.rows);
            //console.log(data);
            callback(undefined, data);
          }
        });
    }
  });
}

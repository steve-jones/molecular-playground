var pg = require('pg');
var fs = require('fs');


//new amazon aws prosgre db link
//var connString = 'postgres://sogfzsvsxfjdlo:14LQTlu3KDSDBeIRFu0XeKXMrf@ec2-54-83-25-238.compute-1.amazonaws.com:5432/dfob3ut0c73hu2';
//local db
var connString = 'postgres://student:student@localhost/student';

//Enrolls a student in a course for a given term
exports.enroll = enroll;

//Populate the students based on csv data
exports.populateStudents = populateStudents;

//Populates the course catalog based on csv data
exports.populateCoursesAndPrereqs = populateCoursesAndPrereqs;

//Returns all students in database
exports.getAllfromTable = getAllfromTable;

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

//Populate the students based on csv data
function populateStudents(callback) {
  //Read in csv file...
  fs.readFile('./lib/db/studentTracks.csv', 'utf8', function(err, data) {
    if(err) {
      return console.log(err);
    }
    else {
      //If success, process the csv data and post to database...
          var entries = data.split("\n");
          var counter = entries.length;

          for(var i in entries) {
            counter--; 
            console.log("COUNTER: " + counter + "\n");
            var values = entries[i].split(",");

            var studentid = values[0];
            console.log('ID: ' + studentid + '\n');
            var password = values[1];
            console.log('PASSWORD: ' + password + '\n');
            var fname = values[2];
            console.log('FNAME: ' + fname + '\n');
            var lname = values[3];
            console.log('LNAME: ' + lname + '\n');
            var year = values[4];
            console.log('YEAR: ' + year + '\n');
            var school = values[5];
            console.log('SCHOOL: ' + school + '\n');
            var gpa = values[6];
            console.log('GPA: ' + gpa + '\n');
            var track = values[7];
            console.log('TRACK: ' + track + '\n\n\n\n');
 
            addNewUser(studentid, password, fname, lname, year, school, gpa, track, 
              function(err, data) {
                if(err) {
                  console.log("STUDENT ADD ERROR: " + err);
                }
                else {
                  console.log("New student from csv added");
                }
              }, counter);
        
          }
    }
  });
}

//Populates the course catalog based on csv data
function populateCoursesAndPrereqs(callback) {
  //Read in csv file...
  fs.readFile('./lib/db/Courses.csv', 'utf8', function(err, data) {
    if(err) {
      return console.log(err);
      response.end();
    }
    else {
          //If success, process csv data and post to database...
          var entries = data.split("\n");
          var counter = entries.length;

          for(var i in entries) {
            counter--; 
            var values = entries[i].split(",");

            var coursenumber = values[0];
            var name = values[1];
            var credits = values[2];
            var prereqs = values[3];
            var term = values[4];
            var instructor = values[5];
 
            addNewCourse(coursenumber, name, credits, term, instructor, prereqs, 
              function(err, data) {
                if(err) {
                  console.log("COURSE ADD ERROR: " + err);
                }
                else {
                  console.log("New course from csv added");
                }
              }, counter); 
        
          }
    }
  });
}

//Returns all data from a table in database
function getAllfromTable(table,callback) {
  var querystring='';
  if(table === undefined || table === 'coursecatalog'){
  querystring ='select * from coursecatalog;' ;
  }
  else if(table === 'students'){
  querystring ='select * from students;' ;
  }
  else if(table === 'admins'){
  querystring ='select * from admins;' ;
  }

  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query(querystring, function (err, result) {
        done();
        client.end();
        if (err) {
          callback(err);
        }
        else {
          console.log(data);
          var data = JSON.stringify(result.rows);
          callback(undefined, data);
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
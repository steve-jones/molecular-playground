var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');
var m = require('../lib/db');


// # User Server-Side Routes

router.get('/testing', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/testview', { title   : 'New page to be made',
                         	users : user, 
				message : 'none yet',
				username : user.id,
				schoolorg:user.schoolorg});
	}
});


router.post('/geneds/enroll', function(req, res) {
  
    var classname = req.body.enroll;
    var coursedata;
    var term;
    var instructor;
    console.log(classname);

var user = req.session.user ||username;
	m.getCourse(classname,function(err,data){
		if(err)
			console.log("course not found\n");
		else{
			coursedata = JSON.parse(data);
			console.log(coursedata);
			term = coursedata[0].credits;
			instructor = "test";
			 m.enroll(user, classname, term,instructor, function(err) {
      			if(err) {
        			console.log('ERROR: ' + err);
     			}
      			else {
					console.log("enrolled\n");
        			res.redirect('/user/geneds');
      			}

   			});
		}
	}); 
});

router.post('/courses/enroll', function(req, res) {
  
    var classname = req.body.enroll;
    var coursedata;
    var term;
    var instructor;
    console.log(classname);

var user = req.session.user ||username;
	m.getCourse(classname,function(err,data){
		if(err)
			console.log("course not found\n");
		else{
			coursedata = JSON.parse(data);
			console.log(coursedata);
			term = coursedata[0].credits;
			instructor = "test";
			console.log(user.id);
			console.log(classname);
			console.log(term);
			console.log(instructor);
			
			 m.enroll(user.id, classname, term,instructor, function(err) {
      			if(err) {
        			//console.log('ERROR: ' + err);
				res.redirect('/user/courses');
     			}
      			else {
					console.log("enrolled");
        			res.redirect('/user/courses');
      			}

   			});
		}
	}); 
});

module.exports = router;
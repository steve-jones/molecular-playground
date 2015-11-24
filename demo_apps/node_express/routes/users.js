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





router.get('/newpage', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/newpage', { title   : 'New page to be made',
                         	users : user,
                         	username : user.id, 
				message : 'none yet'});
	}
});


router.get('/major_track', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/major_track', { title   : 'Major Concentration',
                         	users : user,
                         	username : user.id, 
				message : 'none yet'});
	}
});





//routes for getting their stored list of classes planning to take / took
router.get('/class', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/myclasses', { title   : 'Classes',
                         	users : user, 
                         	username : user.id,
				message : 'none yet'});
	}
});

// routes for changing settings.
router.get('/settings', function(req, res) {
 var user = req.session.user;
 if (user === undefined) {
 req.flash('auth', 'Not logged in!');
 res.redirect('/login');
 }
 else{
 res.render('student/settings', { title : 'Settings',
 users : user,
 message : 'none yet'});
 }
});

// routes for getting generd list
router.get('/geneds', function(req, res) {
	var user = req.session.user;
  	if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
    	res.render('student/geneds', { title   : 'General Education Requirements',
                         	users : user, 
                         	username : user.id,
				message : 'none yet'});
	}
});





// routes for list of courses
router.get('/courses', function(req, res) {
	var user = req.session.user;
	var message = "";
if (user === undefined) {
    	req.flash('auth', 'Not logged in!');
    	res.redirect('/login');
	}
	else{
		res.render('student/courselist', { title   : 'data',
                         				users : user, 
                         				username : user.id,
							message : "hi"});
	}
});


//online calls the admin list 
router.get('/online', function(req, res) {
	var user = req.session.user;
	var requser;
  	var adminlist;

	if(user === undefined){
	  requser= "unknown";
	}
	else{requser= user.id;}

	m.getAllfromTable("admins",function (err, data) {
      	if(err) {
		console.log("error in finding user \n");
      	}
      	else{
			//console.log("user data : " + data);
          	adminlist = JSON.parse(data);
			userlib.onlinelist(function(onlines) {
			    	if (onlines){
			          onlinelist = onlines;
						//console.log("user data : " + onlines);
			          res.render('student/online', { 
						title : 'Users Online',
						adminlist: adminlist,
						onlinelist : onlinelist,
						requser : requser });
	        		}
	        		
  			});
		}
	});

});





// ## main
// The main user view.
router.get('/main', function(req, res) {
  // TDR: added session support
  var user = req.session.user;
	//console.log(user.id);
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('../login');
  }
  else {
      	    res.render('student/main', { title   : 'User Main',
                               message : 'Login Successful',
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
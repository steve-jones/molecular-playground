var express = require('express');
var router = express.Router();
var multer = require('multer');
var userlib = require('../lib/user');

// A logged in "database":
var online = userlib.online;

// # User Server-Side Routes


// Use 3rd party middleware:
/*
router.use(multer({ dest : './public/uploads/',
	         rename : function (fieldname, filename) {
		   return filename.replace(/\W+/g, '-').toLowerCase() + 
		     Date.now();
		 }
	       }));
*/


// This is how we do file uploads:
router.post('/upload', function (req, res) {
  var html = '<html>';
  html += 'Uploaded <strong>' + req.files.file.originalname + '</strong><br><br>';
  html += '<img src="/uploads/' + req.files.file.name + '" width="200">';
  html += '<br><br>Size: ' + req.files.file.size + '';
  html += '</html>';
  res.send(html);
});




// ## main
// The main user view.
router.get('/', function(req, res) {

var user = req.session.user;

  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('../login');
  }
	else if (user.isadminfor !== undefined){
    	res.render('schooladmin/admin', { title   : 'admin page',
                         	user : user, 
				message : 'admins route'});
	}

	});


router.post('/newgroup', function(req, res) {
  
    var groupname = req.body.groupname;
    var parentgroup = req.body.parentgroup;
var user = req.session.user ||username;

        res.render('schooladmin/admin', { title   : 'not implemented yet',
                              user : user, 
                              message :  'error or not setup yet'});
      
});






router.get('/online', function(req, res) {
  res.redirect('/user/online');
});

module.exports = router;
var express = require('express');
var router = express.Router();

var m = require('../model/playlist_functions');


router.get('/', function(req, res) {
	var user = req.session.user;
	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	res.render('playlist_templates/playlist_page', { userinfo   : user});
});

router.get('/list', function(req, res) {
	var user = req.session.user;	

	if (user=== undefined) {
      	req.flash('auth', 'Your session expired, please login to your account');
		res.redirect('/#login');
	}
	res.render('playlist_templates/list', { userinfo   : user});
});


router.get('/add', function(req,res) {
	var user = req.session.user;
	  	if (user === undefined) {
		    	req.flash('auth', 'Not logged in!');
	    		res.redirect('/login');
		}
		else{

	res.render('playlist_templates/add', { userinfo   : user});
		}
});
router.post('/add', function(req,res) {
	var user = req.session.user;
	  	if (user === undefined) {
		    	req.flash('auth', 'Not logged in!');
	    		res.redirect('/login');
		}
		else{
		//add
		}
});

router.get('/edit', function(req,res) {
	var user = req.session.user;
	  	if (user === undefined) {
		    	req.flash('auth', 'Not logged in!');
	    		res.redirect('/login');
		}
		else{

	res.render('playlist_templates/edit', { userinfo   : user, 
					playlists: [{pname:'mol1'},{pname:'mo2'},{pname:'mo3'}]});
		}
});


module.exports = router;

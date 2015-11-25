var express = require('express');
var router = express.Router();

var m = require('../model/molecule_functions');


router.post('/createmolecule', function(req,res) {
	var user = req.session.user;
	  	if (user === undefined || user.role !=='global_admin') {
		    	req.flash('auth', 'Not logged in!');
	    		res.redirect('/login');
		}
		else{}
});



module.exports = router;

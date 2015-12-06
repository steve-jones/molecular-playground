var express = require('express');
var router = express.Router();

var m = require('../model/molecule_functions');


router.get('/', function(req, res) {
	var user_obj = req.session.user;
	res.render('molecule_templates/molecule_page', { userinfo   : user_obj});
});


router.get('/createmolecule', function(req,res) {
	var user = req.session.user;
	  	
res.render('./molecule_templates/upload');
});

router.get('/content', function(req,res) {
	var user = req.session.user;
	  	
			res.render('./molecule_templates/specmole');
	
});



module.exports = router;

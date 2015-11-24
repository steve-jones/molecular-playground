var express = require('express');
var router = express.Router();

var m = require('../controller/postgres'); 
var mc = require('../controller/postgres');// get the related controller file

//Server-Side stats middleware
router.use(function (req, res, next) { 
	console.log();
  console.log('Time:', Date(Date.now()));
  next();
});


/*Server-Side routes middleware
*/

// ##
router.get('/installation/:installtion_id', function(req, res) {
      	    res.render('index', { title   : 'Homepage',message : 'Welcome '});
});

router.get('/installation/edit/:installtion_id/:playlist_id', function(req, res) {
      	    res.render('index', { title   : 'Homepage',message : 'Welcome'});
});


module.exports = router;
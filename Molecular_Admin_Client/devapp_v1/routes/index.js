var express = require('express');
var router = express.Router();

var m = require('../controller/postgres');

//Server-Side stats middleware
router.use(function (req, res, next) {
	console.log();
  console.log('Time:', Date(Date.now()));
  next();
});

// ## main
// The main user view.
router.get('/', function(req, res) {
      	    res.render('index', { title   : 'Homepage',message : 'Welcome to inSpire'});
});
router.get('/edit', function(req, res) {
            res.render('base1', {overview : 'overview: this string is static. the json below is dynamic. '
              +'the data seen below is as a result of the route handler using a function from our file psqldb '
              +'which enables us to make calls to our PostgreSQL in the cloud. The result of this method call '
              +'is an array of json. This json is then passed to the render_template function to be sent client-side.  '
              +'PS. Sry for the wierd json data, it\'s information being fetched from one of my personal dbs :)'
              });
});

module.exports = router;

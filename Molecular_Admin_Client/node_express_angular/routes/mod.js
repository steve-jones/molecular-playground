var express = require('express');
var router = express.Router();
var currentPlanner = undefined;
var userlib = require('../lib/user');


//var editNotesButton = "false";
/*all routes for user home*/

router.get('/', function(req, res){
  res.sendFile('prettyModule.html', {root: 'public/views'});
});

router.post('/savenote', function(req, res){
  //res.render('/prettyModule.html');
  console.log("POST SAVENOTE");

  console.log(req.body);
  res.json({'code':'200'});
});
module.exports = router;

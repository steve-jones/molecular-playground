var express = require('express');
var router = express.Router();

//Server-Side stats middleware
router.use(function (req, res, next) {
	console.log();
  console.log('Time:', Date(Date.now()));
  next();
});

router.get('/', function(req, res) {
  res.json(req);
});

module.exports = router;

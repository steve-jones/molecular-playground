var express = require('express');
var router = express.Router();
var model = require('../model/auth');

// Homepage
router.get('/', function(req, res) {

	var user_obj = req.session.user;
      	    		res.render('home_page', { userinfo   : user_obj, testdata: 'testing'});


});


// Login page
router.post('/login', function(req,res) {
 var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined) {
    res.redirect('/');
}
else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;

    // Perform the user lookup.
    model.login(username,password,function (err, data) {
      if(err) {
        console.log("error in finding user \n");
        req.flash('auth', "error in the search");
        res.redirect('/');
    }
    else {
        console.log("user data : " + data);

        if (data === '[]'){
            console.log("cant find user \n");
            req.flash('auth', "User doesnt exit, please try again or signup for a new acct");
        }
        else{
        // Store the user in our in memory database.
        var userinfo = JSON.parse(data);
        console.log("parsed id: " + userinfo[0].id);

        if(userinfo[0].password !== password){
            req.flash('auth', "Password incorrect! Please try again");
        }
        else{
            req.session.user = userinfo[0];
        }
    }

        // Redirect to main.
        res.redirect('/');
    }
});


}
});

//The logout route:
router.post('/logout', function(req,res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

// About page
router.get('/about', function(req, res) {
	var user_obj = req.session.user;
	res.render('about', { userinfo   : user_obj});
});


module.exports = router;

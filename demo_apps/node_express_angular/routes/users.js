var express = require('express');
var router = express.Router();
var currentPlanner = undefined;
var userlib = require('../lib/user');
 
/*all routes for user home*/
 
 
//if they try to type in /users it will redirect them to users/home
router.get('/', function(req, res){
  res.redirect('/users/home');
});
 
//this will be eveyr users home page calling this route should render
//the particular users home page
router.get('/home', function(req,res){
 
  var user = req.session.user;
  console.log("/home: user is "+user);
  if(user === undefined) {
      console.log("/home: user undefined");
      res.redirect('/login');
  }
  else{
    console.log("/home: send home.html");
    res.sendFile('home.html', {root:"public/views"});
  }
  
});
 
//this should be called to get all of the data associated with the home page
//the data includes the list of all courses a user has all of the data in the
//todo list and any error messages associated with this page
router.get('/homedata', function(req, res) {
  //this is used to check if user is online
  var user = req.session.user;
  var errorMessage = req.flash('error') || '';

  
  if(user === undefined) {
      res.redirect('/login');
  }  
    else{
        //this will render the users home page and show all modules associated
      //with this particular user such as cs 326 or cs 250 it will also
      //show their to-do list
         userlib.todoSorted(user.username, function(err, todo){
           if(err){
             res.redirect('/login');
           }
           else{
         userlib.listHomeModule(user.username, function(userHomeModules){       
      res.json({"err":errorMessage,"plannerList": userHomeModules, 
        "todo": todo});
         });//END
         }
         });
    }
  
});
 
//this should be called to remove indivdual entries from the todo list
//the function expects the following data Month, Day, Year, Time, Info
router.get('/todoRemove', function(req, res){
  var user = req.session.user;
  if(user === undefined){
    res.redirect('/login');
  }
  else{
    var entry = [];
    entry.push(req.body.Month);
    entry.push(req.body.Day);
    entry.push(req.body.Year);
    entry.push(req.body.Time);
    entry.push(req.body.Info);
    userlib.todoRemove(user.username, entry);
    res.redirect('/users/home');
  }
});
 
//this should be called whenever a user wants to add to their todo list
//I send an error if they don't fill in the Info/Time fields
//This fields expects the foloowing data Month, Day, Year, Info, Time
//you should construct drop downs for Month, Day, Year so they always send
//back a number the other two fields should just be text fields
router.get('/todoAdd', function(req, res){
  var user = req.session.user;
  if(user === undefined){
    res.redirect('/login');
  }
  else{
    if(req.body.Info === null || req.body.Time === null){
      req.flash('error', 'please fill in all fields');
      res.redirect('/users/home');
    }
    else{
      var arrayOfDates = [];
      var round = Math.round; //This will be used to convert strings to int.
      var month = round(req.body.Month);
      var day = round(req.body.Day);
      var year = round(req.body.Year);
      arrayOfDates.push(month);
      arrayOfDates.push(day);
      arrayOfDates.push(year);
      arrayOfDates.push(req.body.Time);
      arrayOfDates.push(req.body.Info);
      userlib.todoAdd(user.username, arrayOfDates, function(err, list){
        if(err){
          console.log(err);
        }
      });
      res.redirect('/users/home');
    }
  }
});
 
//this should be called to add a new course like cs250 or cs326
//it expects the name of the course as the variable name planner
router.post('/addHomeModule', function(req, res){
  var user = req.session.user;
  if(user === undefined) {
     res.redirect('/login');
  }
  else{
    userlib.addHomeModule(user.username, req.body.planner, function(err){
   if(err === undefined){
     res.json({"code": 200});
   }
   else{
     //req.flash('error', err);
     //res.redirect('/users/home');
     res.json({"code": 0})
   }
    });
  }
});
 
//this should be called to remove a specific course from the users homepage
//It expects the name of the course to be removed as input the name of
//which should be planner
router.get('/removeHomeModule',function(req, res){
  var user = req.session.user;
  if(user === undefined) {
      res.redirect('/login');
  }
  else{
    userlib.removeHomeModule(user.username, req.body.planner);
    res.redirect('/users/home');// res.json({"code":200});
  }
});
 
 
//this route should be called to add a module to a planners page such as
//adding Notes to cs250. This function expects the name of the module to
//be added under variable name Module. The names of modules that we can add
//are Notes, Budget, UsefulLinks, and UpcomingEvents be sure to add only these
//modules using these exact names
router.get('/addPageModule', function(req,res){
 
var redirected = false;
var user = req.session.user;
  if(user === undefined){
     res.redirect('/login');
   }
  else{
    userlib.listPageModules(user.username, currentPlanner,
      function(listOfModule, data){
        for(var i = 0; i < listOfModule.length; i++){
     if(listOfModule[i].module === req.query.Module){
       req.flash('moduleExists','Section already exists!');
       res.redirect('/users/currentHomeModule');
       redirected = true;
     }
   }     
    if(redirected === false){
      userlib.addPageModule(user.username, req.query.Module, currentPlanner,
        function(err){ console.log(err);});
 
      res.redirect('/users/currentHomeModule');
    }
    });
  }  
});
 
//This should be called when a user wants to remove one of the modules they 
//added such as Notes or Budget. Make sure to pass in the correct module
//names which are Notes, Budget, UpcomingEvents, and UsefulLinks
router.get('/removePageModule', function(req, res){
  var user = req.session.user;
 
  if(user === undefined){
     res.redirect('/login');
  }
  else{
    userlib.removePageModule(user.username, currentPlanner, req.query.Module);
    res.redirect('/users/currentHomeModule');
  }
});
 
 
//This function should be called when you want to add a link or an upcoming
//event. This function expects the name of the module we are adding to
// so UsefulLinks or UpcomingEvents and then if the module is UsefulLinks
// then the data it expects is simply the variable name data which is just 
//the link. If Module equals UpcomingEvents then it expects the variables 
//Month, Day, Year, Time, Info where like before Month, Day and Year should
//be drop downs with the values being int approriate to the field its under
//and Time and Info should be text fields
router.get('/addModuleData', function(req,res){
  var user = req.session.user;
  if(user === undefined){
    res.redirect('/login');
  }
  else {
   console.log(req.query.Day + ' ' + req.query.Time + ' here ' + req.query.Module);  
   if((req.query.Module === 'UsefulLinks' && req.query.data === undefined) || 
   (req.query.Module === 'UpcomingEvents' && (req.query.Month === "undefined" ||
   req.query.Day === "undefined" || req.query.Year === "undefined" ||
   req.query.Time === "" || req.query.Info === ""))){
      req.flash('upcomingError','Fill in all fields!');
      res.redirect('/users/currentHomeModule');
   }
 
   else{
    if("UsefulLinks" === req.query.Module){
      userlib.addModuleData(user.username, currentPlanner, req.query.Module, 
      req.query.data, function(err){   
      if(err){ 
        console.log(err);}
      }); 
    }
    if("UpcomingEvents" === req.query.Module){
   var arrayOfEvent= [];
   arrayOfEvent.push(req.query.Month);
   arrayOfEvent.push(req.query.Day);
   arrayOfEvent.push(req.query.Year);
   arrayOfEvent.push(req.query.Time);
   arrayOfEvent.push(req.query.Info);
     userlib.addModuleData(user.username, currentPlanner, req.query.Module,
      arrayOfEvent, function(err){
      if(err){
        console.log(err);}
      });
      
    }
    res.redirect('/users/currentHomeModule');
   }
 
}
 
});
 
//this should be called to remove an entry from UsefulLinks or UpcomingEvents
//It expects the variable Module which will be either UsefulLinks or 
//UpcomingEvents and you can look at the function above to see what variables
//it expects in each case
router.get('/removeModuleData', function(req,res){
  var user = req.session.user;
  if(user === undefined){
     res.redirect('/login');
  }
  else{
    if(req.query.Module === "UsefulLinks"){
      userlib.removeModuleData(user.username, currentPlanner, req.query.Module,
   req.query.entry);
    }
    if(req.query.Module === "UpcomingEvents"){
      var arrayOfEvent = [];
      arrayOfEvent.push(req.query.Month);
      arrayOfEvent.push(req.query.Day);
      arrayOfEvent.push(req.query.Year);
      arrayOfEvent.push(req.query.Time);
      arrayOfEvent.push(req.query.Info);
     userlib.removeModuleData(user.username, currentPlanner, req.query.Module,
        arrayOfEvent);     
     
    }
       res.redirect('/users/currentHomeModule');    
  }
});
 
 
//this should be called to edit the text in either Budget or Notes
//This function expects two variables Module and comment. Module will
//be either Notes or Budget. comment will be the text the user edited
router.get('/editPageModule', function(req,res){
 
var user = req.session.user;
  if(user === undefined){
     res.redirect('/login');
  }
  else{    
    userlib.editPageModule(user.username, currentPlanner, req.query.Module,
   req.query.comment, function(err){
      if(err){console.log(err);}
    });    
 
   
    res.redirect('/users/currentHomeModule');
  }
});
 
//this function should be called to render the specific module page
//such as cs250's page
router.get('/currentHomeModule/:mod', function(req,res){
  var user = req.session.user;
 
  if(user === undefined) {
    res.redirect('/login');
  }
  else{
    if(req.params.mod !== undefined){
    currentPlanner = req.params.mod;
    }
    console.log(currentPlanner);
    res.sendFile('prettyModule.html', {root: "public/views"});
  }
  
});
 
//this function should be called to get the information for the currentModules
//page. It expects the variable planner when you are on your homepage
//and click the link to a specfic planners page otherwise if the page
//is being re-rendered then nothing needs to be passed in. The function
//will give an error message, a list of all modules on the page
//(listOfModules) and the data array that store all data for every module
//(data). remember its a double array where the first array tells you
// which module you are on such as Notes or Budget and the second array
//will give the data so data[0][0].text will give you the text for Notes
//You can look at the module.ejs file to see which index corresponds
//to which module i know 0 is Notes but i'm uncertain as to the other ones  
router.get('/currentHomeModule', function(req,res){
  
  var user = req.session.user;
  var errorMessage = req.flash('moduleExists') || '';
  var upcomingError = req.flash('upcomingError') || '';
  if(currentPlanner === undefined || req.query.mod !== undefined){
    currentPlanner = req.query.mod;
  }
  //call this everytime to verify the user is logged in
  if(user === undefined) {
    res.redirect('/login');
  }
  else{
    userlib.listPageModules(user.username, currentPlanner,   
    function(listOfModule, data){  
   //   res.json({"message": errorMessage,"listOfModules": listOfModule, 
   //"data" : data);
      res.render('module', {planner : currentPlanner, 
     listOfModules : listOfModule, data: data, message: errorMessage,
	upcomingMessage: upcomingError});
    });
 
 
  }
});
module.exports = router;

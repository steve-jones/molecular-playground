var express		= require('express');

// ADDITION:
// Requiring session library:
var session		= require('express-session');

// ADDITION:
// Requiring flash library:
var flash		= require('connect-flash');

// These are the regular express built-in middleware:
var path		= require('path');
var favicon		= require('serve-favicon');
var logger		= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');

// Our user-defined routes/middleware:
var home_routes       	= require('./routes/home_routes');
// Create the express application:
var app			= express();


// Setup the view engine:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add favicon support:
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ADDITION:
// Added session support
app.use(session({ secret : 'octocat',
                  saveUninitialized : true,
                  resave : true }));
// ADDITION:
// Added flash support:
app.use(flash());

// ADDITION:
// Using our routes/middleware:
app.use('/', home_routes);




//start up the server by loading database in !!!//
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
//exec("ls ", puts);


//load local data bases
//exec("bash ./lib/db/init-db.sh", puts);
//exec("echo running part 2 student enrollments, finish in 10 secs", puts);
//exec("bash ./lib/db/init-db-enrollment.sh", puts);

/////////////////
//EVERYTHING BELOW HELPS WITH MISSING ROUTES
/////////////////

//catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Export the app as the module:
module.exports = app;

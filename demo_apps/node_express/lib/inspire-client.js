var url = require('url');
var http = require('http');

// The url to connect to:
var urlStr = process.argv[2] || 'http://localhost:4000/populatestudents';

var u = url.parse(urlStr);

var options = {
    host: u.hostname,
    path: u.path,
    port: u.port || 80,
    method: 'GET'
  };

function createResponseHandler (callback) {
  function responseHandler(res) {
    var str = '';
    res.on('data', function (chunk) {
      str += chunk;
    });

    res.on('end', function () {
      callback(str);
    });
  }
  return responseHandler;
}

var handler = createResponseHandler(function (data) {
    console.log(data);
});

console.log(' --> connecting to ' + options.host + ' on port ' + options.port);
console.log(' --> resource ' + options.path);

var req = http.request(options, handler);
req.end();


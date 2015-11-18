/*
module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
};
*/

module.exports = function(server) {  // export save as a module
  var router = server.loopback.Router();
  

  router.get('/a', function(req, res) {
    res.send('pongaroo');
  });


  router.get('/b',function(req, res) {
    res.render('index', {title: 'res vs app render'})
  });



  server.use(router);
};
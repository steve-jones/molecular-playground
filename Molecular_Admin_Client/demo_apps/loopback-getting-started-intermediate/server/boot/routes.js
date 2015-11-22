module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
var router = app.loopback.Router();
  router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });
  app.use(router);
};

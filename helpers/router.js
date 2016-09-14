function Router(router, lang) {
  router.get('/', function(req, res, next) {
    res.sendfile('dist/' + lang + '/home.html');
  });

  router.get('/apply', function(req, res, next) {
    res.sendfile('dist/' + lang + '/apply.html');
  });

  return router;
}

module.exports = Router;

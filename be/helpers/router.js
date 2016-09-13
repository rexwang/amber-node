function Router(router, lang) {
  var viewsPath = 'fe/dist/views/';

  router.get('/', function(req, res, next) {
    res.sendfile(viewsPath + lang + '/home.html');
  });
  router.get('/apply', function(req, res, next) {
    res.sendfile(viewsPath + lang + '/apply.html');
  });

  return router;
}

module.exports = Router;

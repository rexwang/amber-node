function Router(router, lang) {
  var html_dir = './public/views/';

  router.get('/', function(req, res, next) {
    res.sendfile(html_dir + lang + '/home.html');
  });

  router.get('/apply', function(req, res, next) {
    res.sendfile(html_dir + lang + '/apply.html');
  });

  return router;
}

module.exports = Router;

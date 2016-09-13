var fs = require('fs');

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

function Router(router, lang) {
  router.get('/', function(req, res, next) {
    readJSONFile('be/lang/home.json', function(err, json) {
      if(err) { throw err; }
      res.render('home', {lang: json[lang]});
    });
  });

  router.get('/apply', function(req, res, next) {
    readJSONFile('be/lang/apply.json', function(err, json) {
      if(err) { throw err; }
      res.render('apply', {lang: json[lang]});
    });
  });

  return router;
}

module.exports = Router;

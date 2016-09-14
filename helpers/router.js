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
    readJSONFile('lang/home.json', function(err, json) {
      if(err) { throw err; }
      res.render('home', {text: json[lang], lang: lang});
    });
  });

  router.get('/apply', function(req, res, next) {
    readJSONFile('lang/apply.json', function(err, json) {
      if(err) { throw err; }
      res.render('apply', {text: json[lang], lang: lang});
    });
  });

  return router;
}

module.exports = Router;

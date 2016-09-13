var express = require('express');
var router = express.Router();
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


/* GET home page. */
router.get('/en', function(req, res, next) {
  readJSONFile('lang/en.json', function(err, json) {
    if(err) { throw err; }
    res.render('index', { title: 'Express', lang: json });
  });
});

router.get('/cn', function(req, res, next) {
  readJSONFile('lang/cn.json', function(err, json) {
    if(err) { throw err; }
    res.render('index', { title: 'Express', lang: json });
  });
});

module.exports = router;

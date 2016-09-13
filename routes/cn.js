var express = require('express');
var router = express.Router();
var readJSONFile = require('../helpers/readJSONFile');

router.get('/', function(req, res, next) {
  readJSONFile('lang/home.json', function(err, json) {
    if(err) { throw err; }
    res.render('index', { title: 'Express', lang: json.cn });
  });
});

router.get('/apply', function(req, res, next) {
  readJSONFile('lang/apply.json', function(err, json) {
    if(err) { throw err; }
    res.render('apply', { title: 'Express', lang: json.cn });
  });
});

module.exports = router;

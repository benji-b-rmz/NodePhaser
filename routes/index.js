var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Phaser Games' });
});

router.get('/eidolon', function(req, res, next) {
	res.render('eidolon', {title: 'Eidolon'});
});

router.get('/dungeon', function(req, res, next) {
	res.render('dungeon', { title: 'Dungeon Crawler'});
});

module.exports = router;

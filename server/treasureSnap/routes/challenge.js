var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
      challenge: "Apple"
  })
});

module.exports = router;

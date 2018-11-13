var express = require('express');
var matchesDb = require('./matches-db');

var router = express.Router();

router.post('/', function(req, res){
  matchesDb.saveMatches(req.body, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Matches were saved successfully");
    }
  });
});

router.get('/generateMatches', function(req, res){
  matchesDb.generateMatches(req.query, function(err, stage){
    if(err) {
      res.status(500).send(err);
    } else {
      res.json(stage);
    }
  })
})

module.exports = router;

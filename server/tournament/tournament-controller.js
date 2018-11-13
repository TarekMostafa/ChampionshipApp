var express = require('express');
var tournamentDb = require('./tournament-db');

var router = express.Router();

router.put('/', function(req, res){
  tournamentDb.addTournament(req.body, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Tournament was added successfully");
    }
  });
});

router.post('/', function(req, res){
  tournamentDb.editTournament(req.body, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Tournament was updated successfully");
    }
  });
});

router.get('/', function(req, res){
  tournamentDb.getTournament(req.query,
    function(err, championship){
    if(err) {
      res.status(500).send(err);
    } else {
      res.json(championship);
    }
  });
});

module.exports = router;

var express = require('express');
var tournamentDB = require('./tournament-db');

var router = express.Router();

router.put('/', function(req, res){
  tournamentDB.addTournament(req.body.addTournamentModel, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Tournament was added successfully");
    }
  });
});

router.post('/', function(req, res){
  tournamentDB.editTournament(req.body.editTournamentModel, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Tournament was updated successfully");
    }
  });
});

router.get('/:tournamentId', function(req, res){
  tournamentDB.getTournament(req.params.tournamentId,
    req.query.tournamentSearchModel, function(err, tournament){
    if(err) {
      res.status(500).send(err);
    } else {
      res.json(tournament);
    }
  });
});

module.exports = router;

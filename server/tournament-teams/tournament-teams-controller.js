var express = require('express');
var tournamentTeamsDb = require('./tournament-teams-db');

var router = express.Router();

router.post('/', function(req, res){
  tournamentTeamsDb.saveTournamentTeams(req.body.saveTournamentTeamsModel, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Tournament teams were updated successfully");
    }
  });
});

module.exports = router;

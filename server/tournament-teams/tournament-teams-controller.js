var express = require('express');
var tournamentTeamsDB = require('./tournament-teams-db');

var router = express.Router();

router.post('/', function(req, res){
  tournamentTeamsDB.saveTournamentTeams(req.body.saveTournamentTeamsModel, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Tournament teams were updated successfully");
    }
  });
});

module.exports = router;

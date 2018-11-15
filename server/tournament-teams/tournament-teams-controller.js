var express = require('express');
var tournamentTeamsDb = require('./tournament-teams-db');

var router = express.Router();

router.post('/', function(req, res){
  tournamentTeamsDb.saveTournamentTeams(req.body, function(err){
    if(err) {
      res.status(err).send();
    } else {
      res.status(200).send("Tournament teams were updated successfully");
    }
  });
});

module.exports = router;

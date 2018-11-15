var express = require('express');
var teamDb = require('./teams-db');

var router = express.Router();

router.get('/', function(req, res){
  teamDb.getTeams(req.query, function(err, teams){
      if(err) {
        res.status(err).send();
      } else {
        res.json(teams);
      }
  });
});

router.get('/continents', function(req,res){
  teamDb.getTeamsContinents(function(err, continent){
    if(err) {
      res.status(err).send();
    } else {
      res.json(continent);
    }
  });
});

module.exports = router;

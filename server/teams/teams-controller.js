var express = require('express');
var teamDb = require('./teams-db');

var router = express.Router();

router.get('/', function(req, res){
  teamDb.getTeams(JSON.parse(req.query.teamsSearchModel), function(err, data){
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(data);
      }
  });
});

router.get('/continents', function(req,res){
  teamDb.getTeamsContinents(function(err, continent){
    if(err) {
      res.status(500).send(err);
    } else {
      res.json(continent);
    }
  });
});

module.exports = router;

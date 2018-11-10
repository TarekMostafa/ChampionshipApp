var express = require('express');
var matchesDb = require('./matches-db');

var router = express.Router();

//router.post('/', function(req, res){
//  matchesDB.saveMatches(req.body.saveMatchesModel, function(err){
//    if(err) {
//      res.status(500).send(err);
//    } else {
//      res.status(200).send("Matches were updated successfully");
//    }
//  });
//});

router.get('/generateMatches', function(req, res){
  var params = {
    championshipId: req.query.championshipId,
    tournamentId: req.query.tournamentId,
    stageId: req.query.stageId
  };
  matchesDb.generateMatches(params, function(err, stage){
    if(err) {
      res.status(500).send(err);
    } else {
      res.json(stage);
    }
  })
})

module.exports = router;

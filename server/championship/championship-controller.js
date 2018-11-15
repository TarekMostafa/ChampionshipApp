var express = require('express');
var championshipDb = require('./championship-db');

var router = express.Router();

router.put('/', function(req, res){
  championshipDb.addChampionship(req.body, function(err){
    if(err) {
      res.status(err).send();
    } else {
      res.status(200).send("Championship was added successfully");
    }
  });
});

router.post('/', function(req, res){
  championshipDb.editChampionship(req.body, function(err){
    if(err) {
      res.status(err).send();
    } else {
      res.status(200).send("Championship was updated successfully");
    }
  });
});

router.get('/', function(req, res){
  championshipDb.getChampionships(function(err, championships){
    if(err) {
      res.status(err).send();
    } else {
      res.json(championships);
    }
  });
});

router.delete('/', function(req, res){
  championshipDb.removeChampionship(req.body, function(err){
    if(err) {
      res.status(err).send();
    } else {
      res.status(200).send("Championship was deleted successfully");
    }
  });
});

module.exports = router;

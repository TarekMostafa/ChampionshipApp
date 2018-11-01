var express = require('express');
var championshipDB = require('./championship-db');

var router = express.Router();

router.put('/', function(req, res){
  championshipDB.addChampionship(req.body.championship, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Championship was added successfully");
    }
  });
});

router.post('/', function(req, res){
  championshipDB.editChampionship(req.body.championship, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Championship was updated successfully");
    }
  });
});

router.get('/', function(req, res){
  championshipDB.getChampionships(function(err, championships){
    if(err) {
      res.status(500).send(err);
    } else {
      res.json(championships);
    }
  });
});

module.exports = router;

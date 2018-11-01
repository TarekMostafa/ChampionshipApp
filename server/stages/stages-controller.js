var express = require('express');
var stagesDB = require('./stages-db');

var router = express.Router();

router.post('/', function(req, res){
  console.log(req.body);
  stagesDB.saveStages(req.body.stagesObj, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Stages were updated successfully");
    }
  });
});

module.exports = router;

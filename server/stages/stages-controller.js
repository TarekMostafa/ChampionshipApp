var express = require('express');
var stagesDb = require('./stages-db');

var router = express.Router();

router.post('/', function(req, res){
  stagesDb.saveStages(req.body.saveStagesModel, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Stages were updated successfully");
    }
  });
});

module.exports = router;

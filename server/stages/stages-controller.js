var express = require('express');
var stagesDb = require('./stages-db');

var router = express.Router();

router.post('/', function(req, res){
  stagesDb.saveStages(req.body, function(err){
    if(err) {
      res.status(err).send();
    } else {
      res.status(200).send("Stages were updated successfully");
    }
  });
});

module.exports = router;

var express = require('express');
var groupsDb = require('./groups-db');

var router = express.Router();

router.post('/', function(req, res){
  groupsDb.saveGroups(req.body, function(err){
    if(err) {
      res.status(err).send();
    } else {
      res.status(200).send("Groups were updated successfully");
    }
  });
});

module.exports = router;

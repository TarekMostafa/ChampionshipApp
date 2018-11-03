var express = require('express');
var groupsDB = require('./groups-db');

var router = express.Router();

router.post('/', function(req, res){
  groupsDB.saveGroups(req.body.groupsObj, function(err){
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Groups were updated successfully");
    }
  });
});

module.exports = router;

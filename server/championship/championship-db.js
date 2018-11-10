var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('./championship-model').championshipModel;

// Insert new Championship to MongoDB
// Just adding the basic property of the championship
var addChampionship = function (inChampionship, callBack) {
  var championship = new championshipModel ();
  championship.name = inChampionship.name;
  championship.save()
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [addChampionship] : " + error);
    callBack(error);
  });
}

// Update Championship in MongoDB
// Just updating the basic property of the championship
var editChampionship = function (inChampionship, callBack) {
  championshipModel.findOneAndUpdate(
    {_id: inChampionship._id},
    {$set:{name:inChampionship.name}}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error){
    logger.error("mongoose [editChampionship] : " + error);
    callBack(error);
  });
}

// Retrieve all Championships that exists in MongoDB
// without tournament teams and tournament stages
var getChampionships = function (callBack) {
  championshipModel.find(
    {},
    {"tournaments.tournament_teams": 0, "tournaments.stages":0}
  )
  .then(function(championships){
    callBack(null, championships);
  })
  .catch(function(error){
    logger.error("mongoose [getChampionships] : " + error);
    callBack(error);
  });
}

module.exports = {
  addChampionship,
  editChampionship,
  getChampionships
}

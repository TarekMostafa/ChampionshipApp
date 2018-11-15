var mongoose = require('mongoose');
var _ = require('lodash');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('./championship-model').championshipModel;

// Insert new Championship to MongoDB
// Just adding the basic property of the championship
var addChampionship = function (inChampionship, callBack) {
  // Validate input parameter
  if(_.isNil(inChampionship.name)){
    callBack(400);
    return;
  }
  // Save Championship
  var championship = new championshipModel ();
  championship.name = inChampionship.name;
  championship.save()
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [addChampionship] : " + error);
    callBack(500);
  });
}

// Update Championship in MongoDB
// Just updating the basic property of the championship
var editChampionship = function (inChampionship, callBack) {
  // Validate input parameter
  if(_.isNil(inChampionship._id) || _.isNil(inChampionship.name)){
    callBack(400);
    return;
  }
  // Find and Update Championship
  championshipModel.findOneAndUpdate(
    {_id: inChampionship._id},
    {$set:{name:inChampionship.name}}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error){
    logger.error("mongoose [editChampionship] : " + error);
    callBack(500);
  });
}

// Retrieve all Championships that exists in MongoDB
// without tournament teams and tournament stages
var getChampionships = function (callBack) {
  championshipModel.find({},
    {"tournaments.tournament_teams": 0, "tournaments.stages":0}
  )
  .then(function(championships){
    callBack(null, championships);
  })
  .catch(function(error){
    logger.error("mongoose [getChampionships] : " + error);
    callBack(500, null);
  });
}

// Remove Championship from MongoDB
var removeChampionship = function (inChampionship, callBack) {
  // Validate input parameter
  if(_.isNil(inChampionship._id)){
    callBack(400);
    return;
  }
  // Find and Remove Championship
  championshipModel.findOneAndRemove({_id: inChampionship._id})
  .then(function(){
    callBack(null);
  })
  .catch(function(error){
    logger.error("mongoose [removeChampionship] : " + error);
    callBack(500);
  });
}

module.exports = {
  addChampionship,
  editChampionship,
  getChampionships,
  removeChampionship
}

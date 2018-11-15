var mongoose = require('mongoose');
var _ = require('lodash');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveGroups = function (params, callBack) {
  // Validate Input parameters
  // Validate Championship Id
  if(_.isNil(params.championshipId) || _.isEmpty(params.championshipId)) {
    callBack(400);
    return;
  }
  // Validate Tournament Id
  if(_.isNil(params.tournamentId) || _.isEmpty(params.tournamentId)) {
    callBack(400);
    return;
  }
  // Validate Stage Id
  if(_.isNil(params.stageId)) {
    callBack(400);
    return;
  }
  // Validate Groups
  if(_.isNil(params.groups) || _.isEmpty(params.groups) || !_.isArray(params.groups)) {
    callBack(400);
    return;
  }
  // Construct Query
  var query = {
    "_id": params.championshipId,
    "tournaments._id": params.tournamentId
  }
  championshipModel.findOne(query, {"tournaments.$" : 1})
  .then(function(championship){
    if(_.isNil(championship)) {
      throw "Invalid Championship Id [" + params.championshipId + "], " +
        "Tournament Id [" + params.tournamentId + "] and " +
        "Stage Id [" + params.stageId + "]";
    }
    // Get Current Stage
    return championship.tournaments[0].current_stage;
  })
  .then(function(currentStage){
    // Construct Fields that will be updated
    var updateObj = {
      "tournaments.$[elem].stages.$[stage].groups": params.groups
    };
    // Update Current Stage
    if(currentStage._id === params.stageId) {
      updateObj["tournaments.$[elem].current_stage.groups"] = params.groups;
    }
    // Set Array Filters
    var arrayFilters = [ {"elem._id": mongoose.Types.ObjectId(params.tournamentId)},
                         {"stage._id": params.stageId} ];
    // Save groups to Tournament
    return championshipModel.findOneAndUpdate(
      {_id: params.championshipId},
      {$set: updateObj},
      {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}
    );
  })
  .then(function(updatedObj){
    if(_.isNull(updatedObj)) {
      throw "Invalid Championship Id [" + params.championshipId + "], " +
        "Tournament Id [" + params.tournamentId + "] and " +
        "Stage Id [" + params.stageId + "]";
    }
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [saveGroups] : " + error);
    callBack(500);
  });
}

module.exports = {
  saveGroups
}

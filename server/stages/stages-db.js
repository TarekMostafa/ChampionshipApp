var mongoose = require('mongoose');
var _ = require('lodash');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveStages = function (params, callBack) {
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
  // Validate Stages
  if(_.isNil(params.stages) || _.isEmpty(params.stages) || !_.isArray(params.stages)) {
    callBack(400);
    return;
  }
  // Set Current Stage
  var currentStage = params.stages[0];
  // Construct Update Object
  var updateObj = {
    "tournaments.$[elem].stages": params.stages,
    "tournaments.$[elem].current_stage": currentStage
  };
  // Set Array Filters
  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(params.tournamentId) } ];
  // Save Stages to Tournament
  championshipModel.findOneAndUpdate(
    {_id: params.championshipId},
    {$set: updateObj},
    {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}
  )
  .then(function(updatedObj){
    if(_.isNull(updatedObj)) {
      throw "Invalid Championship Id [" + params.championshipId + "] and " +
        "Tournament Id [" + params.tournamentId + "]";
    }
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [saveStages] : " + error);
    callBack(500);
  });
}

module.exports = {
  saveStages
}

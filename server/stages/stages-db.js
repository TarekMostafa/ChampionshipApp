var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveStages = function (params, callBack) {
  // Set Current Stage
  var currentStage = {};
  if(params.hasOwnProperty("stages") && params.stages.length >= 1) {
    currentStage = params.stages[0];
  }

  var updateObj = {
    "tournaments.$[elem].stages": params.stages,
    "tournaments.$[elem].current_stage": currentStage
  };

  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(params.tournamentId) } ];

  championshipModel.findOneAndUpdate(
    {_id: params.championshipId},
    {$set: updateObj},
    {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [saveStages] : " + error);
    callBack(error);
  });
}

module.exports = {
  saveStages
}

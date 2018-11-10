var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveStages = function (saveStagesModel, callBack) {
  // Set Current Stage
  var currentStage = {};
  if(saveStagesModel.hasOwnProperty("stages") && saveStagesModel.stages.length >= 1) {
    currentStage = saveStagesModel.stages[0];
  }

  var updateObj = {
    "tournaments.$[elem].stages": saveStagesModel.stages,
    "tournaments.$[elem].current_stage": currentStage
  };

  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(saveStagesModel.tournamentId) } ];

  championshipModel.findOneAndUpdate(
    {_id: saveStagesModel.championshipId},
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

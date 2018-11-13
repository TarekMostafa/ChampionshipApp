var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveGroups = function (params, callBack) {
  var query = {
    "_id": params.championshipId,
    "tournaments._id": params.tournamentId
  }
  championshipModel.findOne(query, {"tournaments.$" : 1})
  .then(function(championship){
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

    var arrayFilters = [ {"elem._id": mongoose.Types.ObjectId(params.tournamentId)},
                         {"stage._id": params.stageId} ];

    return championshipModel.findOneAndUpdate(
      {_id: params.championshipId},
      {$set: updateObj},
      {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}
    );
  })
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [saveGroups] : " + error);
    callBack(error);
  });
}

module.exports = {
  saveGroups
}

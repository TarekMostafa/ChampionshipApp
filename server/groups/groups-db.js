var championshipModel = require('../championship/championship-model');
var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');

var saveGroups = function (saveGroupsModel, callBack) {
  championshipModel.findOne(
    {"tournaments._id": mongoose.Types.ObjectId(saveGroupsModel.tournamentId)},
    {"tournaments.tournament_teams":0, "tournaments.stages": 0}
  )
  .then(function(championship){
    return championship.tournaments[0].current_stage;
  })
  .then(function(currentStage){

    var updateObj = {
      "tournaments.$[elem].stages.$[stage].groups": saveGroupsModel.groups
    };

    if(currentStage._id === saveGroupsModel.stageId) {
      updateObj["tournaments.$[elem].current_stage.groups"] = saveGroupsModel.groups;
    }

    var arrayFilters = [ {"elem._id": mongoose.Types.ObjectId(saveGroupsModel.tournamentId)},
                         {"stage._id": saveGroupsModel.stageId} ];

    return championshipModel.findOneAndUpdate(
      {},
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

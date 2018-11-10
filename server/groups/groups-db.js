var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveGroups = function (saveGroupsModel, callBack) {
  // Construct Query
  var query = {
    "_id": mongoose.Types.ObjectId(saveGroupsModel.championshipId),
    "tournaments._id": mongoose.Types.ObjectId(saveGroupsModel.tournamentId)
  }
  // Exclude some fields
  var projection = {
    "tournaments.tournament_teams":0,
     "tournaments.stages": 0
  }

  championshipModel.findOne(query,projection)
  .then(function(championship){
    return championship.tournaments[0].current_stage;
  })
  .then(function(currentStage){
    // Construct Fields that will be updated
    var updateObj = {
      "tournaments.$[elem].stages.$[stage].groups": saveGroupsModel.groups
    };
    // Update Current Stage
    if(currentStage._id === saveGroupsModel.stageId) {
      updateObj["tournaments.$[elem].current_stage.groups"] = saveGroupsModel.groups;
    }

    var arrayFilters = [ {"elem._id": mongoose.Types.ObjectId(saveGroupsModel.tournamentId)},
                         {"stage._id": saveGroupsModel.stageId} ];

    return championshipModel.findOneAndUpdate(
      {_id: saveGroupsModel.championshipId},
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

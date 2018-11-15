var mongoose = require('mongoose');
var _ = require('lodash');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveTournamentTeams = function (params, callBack) {
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
  if(_.isNil(params.tournamentTeams) || _.isEmpty(params.tournamentTeams) || !_.isArray(params.tournamentTeams)) {
    callBack(400);
    return;
  }
  // Construct Update Object
  var updateObj = {
    "tournaments.$[elem].tournament_teams": params.tournamentTeams
  };
  // Set Array Filters
  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(params.tournamentId) } ];
  // Save Tournament Teams
  championshipModel.findOneAndUpdate(
    {_id: params.championshipId},
    {$set: updateObj},
    {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [saveTournamentTeams] : " + error);
    callBack(500);
  });
}

module.exports = {
  saveTournamentTeams
}

var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var saveTournamentTeams = function (params, callBack) {
  var updateObj = {
    "tournaments.$[elem].tournament_teams": params.tournamentTeams
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
    logger.error("mongoose [saveTournamentTeams] : " + error);
    callBack(error);
  });
}

module.exports = {
  saveTournamentTeams
}

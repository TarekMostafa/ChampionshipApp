var championshipModel = require('../championship/championship-model');
var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');

var saveTournamentTeams = function (saveTournamentTeamsModel, callBack) {
  var updateObj = {
    "tournaments.$[elem].tournament_teams": saveTournamentTeamsModel.tournamentTeams
  };

  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(saveTournamentTeamsModel.tournamentId) } ];

  championshipModel.findOneAndUpdate(
    {},
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

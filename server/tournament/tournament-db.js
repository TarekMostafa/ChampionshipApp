var championshipModel = require('../championship/championship-model');
var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');

var addTournament = function (addTournamentModel, callBack){
  championshipModel.findOneAndUpdate(
    {_id: addTournamentModel.championshipId},
    {$push: {tournaments: addTournamentModel.tournament}}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [addTournament] : " + error);
    callBack(error);
  });
}

var editTournament = function (editTournamentModel, callBack){
  var updateObj = {
    "tournaments.$[elem].name": editTournamentModel.tournament.name,
    "tournaments.$[elem].no_of_teams": editTournamentModel.tournament.no_of_teams,
    "tournaments.$[elem].year": editTournamentModel.tournament.year
  };

  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(editTournamentModel.tournament._id) } ];

  championshipModel.findOneAndUpdate(
    {_id: editTournamentModel.championshipId},
    {$set: updateObj},
    {arrayFilters : arrayFilters, returnNewDocument: true}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [editTournament] : " + error);
    callBack(error);
  });
}

var getTournament = function (tournamentId, tournamentSearchModel, callBack){
  // Check tournamentSearchModel Parameter
  if(typeof tournamentSearchModel === "string") {
    tournamentSearchModel = JSON.parse(tournamentSearchModel);
  } else {
    tournamentSearchModel = {};
  }

  var projection = {};
  // Check loadTournamentTeams Property
  // Project tournament_teams if loadTournamentTeams not defined or false
  if(!tournamentSearchModel.hasOwnProperty("loadTournamentTeams") ||
    !tournamentSearchModel.loadTournamentTeams){
    projection["tournaments.tournament_teams"] = 0;
  }
  // Check loadStages Property
  // Project stages if loadStages not defined or false
  if(!tournamentSearchModel.hasOwnProperty("loadStages") ||
    !tournamentSearchModel.loadStages){
    projection["tournaments.stages"] = 0;
  } else {
    // Check loadGroups Property
    // Project groups if loadGroups not defined or false
    if(!tournamentSearchModel.hasOwnProperty("loadGroups") ||
      !tournamentSearchModel.loadGroups) {
        projection["tournaments.stages.groups"] = 0;
      }
  }

  championshipModel.findOne(
    {"tournaments._id": mongoose.Types.ObjectId(tournamentId)},
    projection
  )
  .then(function(championship){
    callBack(null, championship.tournaments.id(tournamentId));
  })
  .catch(function(error) {
    logger.error("mongoose [getTournament] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  addTournament,
  editTournament,
  getTournament
}

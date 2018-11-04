var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var addTournament = function (addTournamentModel, callBack){
  mongooseConnection.open()
  .then(function(){
    return championshipModel.findOneAndUpdate({_id: addTournamentModel.championshipId},
      {$push: {tournaments: addTournamentModel.tournament}});
  })
  .then(function(){
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error) {
    console.log("mongoose [addTournament] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

var editTournament = function (editTournamentModel, callBack){
  mongooseConnection.open()
  .then(function(){
    var updateObj = {
      "tournaments.$[elem].name": editTournamentModel.tournament.name,
      "tournaments.$[elem].no_of_teams": editTournamentModel.tournament.no_of_teams,
      "tournaments.$[elem].year": editTournamentModel.tournament.year
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(editTournamentModel.tournament._id) } ];

    return championshipModel.findOneAndUpdate({_id: editTournamentModel.championshipId},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true});
  })
  .then(function(){
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error) {
    console.log("mongoose [editTournament] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

var getTournament = function (tournamentId, callBack){
  mongooseConnection.open()
  .then(function(){
    return championshipModel.findOne({"tournaments._id": mongoose.Types.ObjectId(tournamentId)});
  })
  .then(function(championship){
    mongooseConnection.close();
    callBack(null, championship.tournaments.id(tournamentId));
  })
  .catch(function(error) {
    console.log("mongoose [getTournament] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  addTournament,
  editTournament,
  getTournament
}

var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var addTournament = function (tournamentObj, callBack){
  mongooseConnection.open()
  .then(function(){
    return championshipModel.findOneAndUpdate({_id: tournamentObj.championshipId},
      {$push: {tournaments: tournamentObj.tournament}});
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

var editTournament = function (tournamentObj, callBack){
  mongooseConnection.open()
  .then(function(){
    var updateObj = {
      "tournaments.$[elem].name": tournamentObj.tournament.name,
      "tournaments.$[elem].no_of_teams": tournamentObj.tournament.no_of_teams,
      "tournaments.$[elem].year": tournamentObj.tournament.year
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(tournamentObj.tournament._id) } ];

    return championshipModel.findOneAndUpdate({_id: tournamentObj.championshipId},
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

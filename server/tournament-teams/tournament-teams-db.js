var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var saveTournamentTeams = function (tournamentTeamsObj, callBack) {
  mongooseConnection.open()
  .then(function(){
    var updateObj = {
      "tournaments.$[elem].tournament_teams": tournamentTeamsObj.tournamentTeams
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(tournamentTeamsObj.tournamentId) } ];

    return championshipModel.findOneAndUpdate({},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true});
  })
  .then(function(){
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error) {
    console.log("mongoose [saveTournamentTeams] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  saveTournamentTeams
}

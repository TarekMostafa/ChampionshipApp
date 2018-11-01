var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var saveTournamentTeams = function (tournamentTeamsObj, callBack) {
  mongooseConnection.open(function(connection_error) {
    if (connection_error) {
      callBack(connection_error);
      return;
    }

    var updateObj = {
      "tournaments.$[elem].tournament_teams": tournamentTeamsObj.tournamentTeams
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(tournamentTeamsObj.tournamentId) } ];

    championshipModel.findOneAndUpdate({},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}, function(err, obj){
        mongooseConnection.close();
        if (err) {
          callBack(err);
        } else {
          callBack(null);
        }
      });
  });
}

module.exports = {
  saveTournamentTeams
}

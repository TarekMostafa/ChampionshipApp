var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var addTournament = function (tournamentObj, callBack){
  mongooseConnection.open(function(connection_error) {
    if (connection_error) {
      callBack(connection_error);
      return;
    }

    championshipModel.findOneAndUpdate({_id: tournamentObj.championshipId},
      {$push: {tournaments: tournamentObj.tournament}}, function(err){
        mongooseConnection.close();
        if (err) {
          callBack(err);
        } else {
          callBack(null);
        }
      });
  });
}

var editTournament = function (tournamentObj, callBack){
  mongooseConnection.open(function(connection_error) {
    if (connection_error) {
      callBack(connection_error);
      return;
    }

    var updateObj = {
      "tournaments.$[elem].name": tournamentObj.tournament.name,
      "tournaments.$[elem].no_of_teams": tournamentObj.tournament.no_of_teams,
      "tournaments.$[elem].year": tournamentObj.tournament.year
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(tournamentObj.tournament._id) } ];

    championshipModel.findOneAndUpdate({_id: tournamentObj.championshipId},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true}, function(err, obj){
        mongooseConnection.close();
        if (err) {
          callBack(err);
        } else {
          callBack(null);
        }
      });
  });
}

var getTournament = function (tournamentId, callBack){
  mongooseConnection.open(function(connection_error) {
    if (connection_error) {
      callBack(connection_error, null);
      return;
    }

    championshipModel.findOne({"tournaments._id": mongoose.Types.ObjectId(tournamentId)}, function(err, championship){
      mongooseConnection.close();
      if (err) {
        callBack(err, null);
      } else {
        callBack(null, championship.tournaments.id(tournamentId));
      }
    })
  });
}

module.exports = {
  addTournament,
  editTournament,
  getTournament
}

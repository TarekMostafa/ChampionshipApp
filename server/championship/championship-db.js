var championshipModel = require('./championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');

var addChampionship = function (championship, callBack){
  mongooseConnection.open(function(connection_error){
    if (connection_error) {
      callBack(connection_error);
      return;
    }
    // Construct new Championship
    var newChampionship = new championshipModel ({name:championship.name});
    // Add new Championship
    newChampionship.save(function(err){
      mongooseConnection.close();
      if (err) {
        callBack(err);
      } else {
        callBack(null);
      }
    });
  });
}

var editChampionship = function (championship, callBack){
  mongooseConnection.open(function(connection_error){
    if (connection_error) {
      callBack(connection_error);
      return;
    }

    championshipModel.findOneAndUpdate({_id: championship._id},
      {$set:{name:championship.name}}, function(err){
        mongooseConnection.close();
        if (err) {
          callBack(err);
        } else {
          callBack(null);
        }
      })
  });
}

var getChampionships = function (callBack) {
  mongooseConnection.open(function(connection_error){
    if (connection_error) {
      callBack(connection_error, null);
      return;
    }

    championshipModel.find({}, {"tournaments.tournament_teams": 0, "tournaments.stages":0},
      function(err, championships){
      mongooseConnection.close();
      if (err) {
        callBack(err, null);
      } else {
        callBack(null, championships);
      }
    });
  });
}

module.exports = {
  addChampionship,
  editChampionship,
  getChampionships
}

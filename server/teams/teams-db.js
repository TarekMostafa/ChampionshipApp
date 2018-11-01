var teamsModel = require('./teams-model').teamModel;
var mongooseConnection = require('../global-modules/mongoose-connection');

var getTeams = function(teamName, continent, limit, skip, callBack){
  mongooseConnection.open(function(connection_error){
    if (connection_error) {
      callBack(connection_error, null);
      return;
    }

    var query = {
      is_active: true
    };
    // Check teamName passed parameter
    if(teamName != null && teamName.length != 0){
      query.name = { $regex: ".*" + teamName + ".*", $options: 'i' };
    }
    // Check continent passed parameter
    if(continent.length !=0){
      query.continent = continent;
    }
    // Find Teams
    teamsModel.find(query)
              .limit(parseInt(limit,10))
              .skip(parseInt(skip,10))
              .exec(function(err, data){
      mongooseConnection.close();
      if (err) {
        callBack(err, null);
      } else {
        callBack(null, data);
      }
    });
  });
}

var getTeamsContinents = function(callBack){
  mongooseConnection.open(function(connection_error){
    if (connection_error) {
      callBack(connection_error, null);
      return;
    }

    var query = {
      is_active: true
    };

    teamsModel.find(query).distinct('continent', function(err, continents){
      mongooseConnection.close();
      if (err) {
        callBack(err, null);
      } else {
        callBack(null, continents);
      }
    });
  });
}

module.exports = {
  getTeams,
  getTeamsContinents
}

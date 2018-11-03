var teamsModel = require('./teams-model').teamModel;
var mongooseConnection = require('../global-modules/mongoose-connection');

var getTeams = function(teamName, continent, limit, skip, callBack){
  mongooseConnection.open()
  .then(function(){
    // Set Teams Query
    var query = {
      is_active: true
    };
    // Check teamName passed parameter
    if(teamName != undefined && teamName != null && teamName.length != 0){
      query.name = { $regex: ".*" + teamName + ".*", $options: 'i' };
    }
    // Check continent passed parameter
    if(continent != undefined && continent != null && continent.length != 0){
      query.continent = continent;
    }
    // Find Teams
    return teamsModel.find(query)
              .limit(parseInt(limit,10))
              .skip(parseInt(skip,10));
  })
  .then(function(teams){
    mongooseConnection.close();
    callBack(null, teams);
  })
  .catch(function(error) {
    console.log("mongoose [getTeams] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

var getTeamsContinents = function(callBack){
  mongooseConnection.open()
  .then(function(){
    // Set Teams Continents Query
    var query = {
      is_active: true
    };
    // Find Continents
    return teamsModel.find(query).distinct('continent');
  })
  .then(function(continents){
    mongooseConnection.close();
    callBack(null, continents);
  })
  .catch(function(error) {
    console.log("mongoose [getTeamsContinents] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  getTeams,
  getTeamsContinents
}

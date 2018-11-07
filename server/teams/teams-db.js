var teamsModel = require('./teams-model').teamModel;
var mongooseConnection = require('../global-modules/mongoose-connection');
var logger = require('../global-modules/winston-logger');

var getTeams = function(teamsSearchModel, callBack){
  mongooseConnection.open()
  .then(function(){
    // Set Teams Query
    var query = {
      is_active: true
    };
    // Check teamName passed parameter
    if(teamsSearchModel.name != undefined && teamsSearchModel.name != null
      && teamsSearchModel.name.length != 0){
      query.name = { $regex: ".*" + teamsSearchModel.name + ".*", $options: 'i' };
    }
    // Check continent passed parameter
    if(teamsSearchModel.continent != undefined && teamsSearchModel.continent != null
      && teamsSearchModel.continent.length != 0){
      query.continent = teamsSearchModel.continent;
    }
    // Find Teams
    return teamsModel.find(query)
              .limit(parseInt(teamsSearchModel.limit,10))
              .skip(parseInt(teamsSearchModel.skip,10));
  })
  .then(function(teams){
    mongooseConnection.close();
    callBack(null, teams);
  })
  .catch(function(error) {
    logger.error("mongoose [getTeams] : " + error);
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
    logger.error("mongoose [getTeamsContinents] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  getTeams,
  getTeamsContinents
}

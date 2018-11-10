var teamsModel = require('./teams-model').teamModel;
var logger = require('../global-modules/winston-logger');

var getTeams = function(teamsSearchModel, callBack){
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
  teamsModel.find(query)
  .limit(parseInt(teamsSearchModel.limit,10))
  .skip(parseInt(teamsSearchModel.skip,10))
  .then(function(teams){
    callBack(null, teams);
  })
  .catch(function(error) {
    logger.error("mongoose [getTeams] : " + error);
    callBack(error);
  });
}

var getTeamsContinents = function(callBack){
  // Set Teams Continents Query
  var query = {
    is_active: true
  };
  // Find Continents
  teamsModel.find(query)
  .distinct('continent')
  .then(function(continents){
    callBack(null, continents);
  })
  .catch(function(error) {
    logger.error("mongoose [getTeamsContinents] : " + error);
    callBack(error);
  });
}

module.exports = {
  getTeams,
  getTeamsContinents
}

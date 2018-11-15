var _ = require('lodash');
var teamsModel = require('./teams-model').teamModel;
var logger = require('../global-modules/winston-logger');

var getTeams = function(params, callBack){
  // Set Teams Query
  var query = {
    is_active: true
  };
  // Check passed name parameter
  if(!_.isNil(params.name) && !_.isEmpty(params.name)){
    query.name = { $regex: ".*" + params.name + ".*", $options: 'i' };
  }
  // Check passed continent parameter
  if(!_.isNil(params.continent) && !_.isEmpty(params.continent)){
    query.continent = params.continent;
  }
  // Check passed limit parameter
  var limit = 0;
  if(!_.isNil(params.limit) && !_.isNaN(_.parseInt(params.limit)) ){
    limit = _.parseInt(params.limit);
  }
  // Check passed skip parameter
  var skip = 0;
  if(!_.isNil(params.skip) && !_.isNaN(_.parseInt(params.skip)) ){
    skip = _.parseInt(params.skip);
  }
  // Find Teams
  teamsModel.find(query)
  .limit(limit)
  .skip(skip)
  .then(function(teams){
    callBack(null, teams);
  })
  .catch(function(error) {
    logger.error("mongoose [getTeams] : " + error);
    callBack(500);
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
    callBack(500);
  });
}

module.exports = {
  getTeams,
  getTeamsContinents
}

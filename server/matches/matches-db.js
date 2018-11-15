var mongoose = require('mongoose');
var _ = require('lodash');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;
var matchSchema = require('./matches-model').matchSchema;

// Generate Matches for Groups Automatically
// by updating Group Schema and add group_matches property
var generateMatches = function (params, callBack) {
  // Validate Input parameters
  // Validate Championship Id
  if(_.isNil(params.championshipId) || _.isEmpty(params.championshipId)) {
    callBack(400);
    return;
  }
  // Validate Tournament Id
  if(_.isNil(params.tournamentId) || _.isEmpty(params.tournamentId)) {
    callBack(400);
    return;
  }
  // Validate Stage Id
  if(_.isNil(params.stageId) || _.isNaN(_.parseInt(params.stageId))) {
    callBack(400);
    return;
  }
  // Get Tournament Stage
  var query = {
    "_id": params.championshipId,
    "tournaments._id": params.tournamentId
  }
  championshipModel.findOne(query, {"tournaments.$" : 1})
  .then(function(championship){
    return _.find(championship.tournaments[0].stages, {_id: _.parseInt(params.stageId)});
  })
  .then(function(stage){
    setMatches(stage);
    callBack(null, stage);
  })
  .catch(function(error) {
    logger.error("mongoose [generateMatches] : " + error);
    callBack(error, null);
  });
}

var saveMatches = function (params, callBack) {
  // Validate Input parameters
  // Validate Championship Id
  if(_.isNil(params.championshipId) || _.isEmpty(params.championshipId)) {
    callBack(400);
    return;
  }
  // Validate Tournament Id
  if(_.isNil(params.tournamentId) || _.isEmpty(params.tournamentId)) {
    callBack(400);
    return;
  }
  // Validate Stage Id
  if(_.isNil(params.stageId) || _.isNaN(_.parseInt(params.stageId))) {
    callBack(400);
    return;
  }
  // Get Tournament Stage
  var query = {
    "_id": params.championshipId,
    "tournaments._id": params.tournamentId
  }
  championshipModel.findOne(query, {"tournaments.$" : 1})
  .then(function(championship){
    var stage = _.find(championship.tournaments[0].stages, {_id: _.parseInt(params.stageId)});
    return {
      stage: stage,
      tournament: championship.tournaments[0]
    }
  })
  .then(function(obj){
    var stage = obj.stage;
    var tournament = obj.tournament;
    // Set Matches to the retrieved stage
    setMatches(stage);
    var updateObj = {
      "tournaments.$[elem].stages.$[stage].groups": stage.groups
    };
    // Update Current Stage
    if(tournament.current_stage._id === params.stageId) {
      updateObj["tournaments.$[elem].current_stage.groups"] = stage.groups;
    }

    var arrayFilters = [ {"elem._id": mongoose.Types.ObjectId(params.tournamentId)},
                         {"stage._id": params.stageId} ];

    return championshipModel.findOneAndUpdate(
      {_id: params.championshipId},
      {$set: updateObj},
      {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}
    );
  })
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [saveMatches] : " + error);
    callBack(error);
  });
}

var setMatches = function (stage) {
  // Check that there is no matches generated before
  // and the teams are assigned to the groups
  var matchesExist = false;
  var teamsAssigned = true;
  for(let group of stage.groups) {
    if(group.hasOwnProperty("group_matches") &&
      group.group_matches.constructor === Array &&
      group.group_matches.length > 0) {
      matchesExist = true;
      break;
    }
    if(group.hasOwnProperty("group_teams") &&
      group.group_teams.constructor === Array &&
      group.group_teams.length === 0) {
      teamsAssigned = false;
      break;
    }
  }
  if(matchesExist) {
    callBack("The matches were generated before", stage);
    return;
  }
  if(!teamsAssigned) {
    callBack("The teams are not assigend properly", stage);
    return;
  }
  // Loop through each group and generate it's matches
  for(let group of stage.groups) {
    // Declare and Initialize group_matches Property
    group.group_matches = [];
    // Copy group Teams of this Group
    let group_teams = _.cloneDeep(group.group_teams);
    // add dummy team if group contains odd number of teams
    if(group_teams.length % 2 != 0){
      group_teams.push({
        team: {name: "dummy"}
      })
    }
    const groupTeamsLength = group_teams.length;
    // Calculate Rounds for each group
    let rounds = (groupTeamsLength - 1) * stage.no_of_legs;
    // Calculate Number of matches per Round
    let matchesPerRound = Math.floor(groupTeamsLength / 2);
    for(let r = 0; r < rounds; r++) {
      for(let m = 0; m < matchesPerRound; m++) {
        // Calculate Home and Away teams
        let home = (r+m) % (groupTeamsLength - 1);
        let away = 0;
        if(m === 0){
          away = (groupTeamsLength - 1);
        } else {
          away = (groupTeamsLength - 1 - m + r) % (groupTeamsLength - 1);
        }
        // Get teams
        let homeTeam = group_teams[home].team;
        let awayTeam = group_teams[away].team;
        if(homeTeam.name === "dummy" || awayTeam.name === "dummy") {
          continue;
        }
        // Construct the match
        let match = matchSchema;
        if (r%2 === 0) {
          match.team1 = homeTeam;
          match.team2 = awayTeam;
        } else {
          match.team2 = homeTeam;
          match.team1 = awayTeam;
        }
        group.group_matches.push(match);
      }
    }
  }
}

module.exports = {
  generateMatches,
  saveMatches
}

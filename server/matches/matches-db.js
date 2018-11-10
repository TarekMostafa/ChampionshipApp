var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;
var matchSchema = require('./matches-model').matchSchema;

// Generate Matches for Groups Automatically
// by updating Group Schema and add group_matches property
var generateMatches = function (params, callBack) {
  // Construct Query
  var query = {
    "_id": params.championshipId,
    "tournaments._id": params.tournamentId,
    "tournaments.stages._id": params.stageId
  }
  championshipModel.findOne(query, {"tournaments.tournament_teams":0})
  .then(function(championship){
    return championship.tournaments[0].stages[0];
  })
  .then(function(stage){
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
      // Calculate Rounds for each group
      let rounds = (group.group_teams.length - 1) * stage.no_of_legs;
      // Calculate Number of matches per Round
      let matchesPerRound = Math.floor(group.group_teams.length / 2);
      for(let r = 0; r < rounds; r++) {
        for(let m = 0; m < matchesPerRound; m++) {
          // Calculate Home and Away teams
          let home = (r+m) % (group.group_teams.length - 1);
          let away = 0;
          if(m === 0){
            away = (group.group_teams.length - 1);
          } else {
            away = (group.group_teams.length - 1 - m + r) % (group.group_teams.length - 1);
          }
          let match = matchSchema;
          if (r%2 === 0) {
            match.team1 = group.group_teams[home].team;
            match.team2 = group.group_teams[away].team;
          } else {
            match.team2 = group.group_teams[home].team;
            match.team1 = group.group_teams[away].team;
          }
          group.group_matches.push(match);
        }
      }
    }
    callBack(null, stage);
  })
  .catch(function(error) {
    logger.error("mongoose [generateMatches] : " + error);
    callBack(error, null);
  });
}

module.exports = {
  generateMatches
}

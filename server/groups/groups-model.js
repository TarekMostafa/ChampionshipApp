var mongoose = require('mongoose');
var team = require('../teams/teams-model').teamSchema;

var GroupSchema = mongoose.Schema({
  number: Number,
  group_teams: [{
    team: team,
    match_played: Number,
    win: Number,
    draw: Number,
    lose: Number,
    goal_for: Number,
    goal_against: Number,
    points: Number
  }]
});

module.exports = GroupSchema;

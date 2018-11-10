var mongoose = require('mongoose');
var tournamentTeam = require('../tournament-teams/tournament-teams-model').tournamentTeamsSchema;
var stage = require('../stages/stages-model').stageSchema;

var tournamentSchema = mongoose.Schema({
  name: String,
  no_of_teams: Number,
  year: Number,
  current_stage: stage,
  tournament_teams: [tournamentTeam],
  stages: [stage]
});

module.exports = {
  tournamentSchema
};

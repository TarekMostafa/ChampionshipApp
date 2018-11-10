var mongoose = require('mongoose');
var tournamentTeams = require('../tournament-teams/tournament-teams-model');
var stages = require('../stages/stages-model');

var TournamentSchema = mongoose.Schema({
  name: String,
  no_of_teams: Number,
  year: Number,
  current_stage: stages,
  tournament_teams: [tournamentTeams],
  stages: [stages]
});

module.exports = TournamentSchema;

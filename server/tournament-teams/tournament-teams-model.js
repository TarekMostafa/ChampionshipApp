var mongoose = require('mongoose');
var team = require('../teams/teams-model').teamSchema;

var TournamentTeamsSchema = mongoose.Schema({
  team: team
});

module.exports = TournamentTeamsSchema;

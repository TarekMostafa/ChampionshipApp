var mongoose = require('mongoose');
var team = require('../teams/teams-model').teamSchema;

var tournamentTeamsSchema = mongoose.Schema({
  team: team
});

module.exports = {
  tournamentTeamsSchema
};

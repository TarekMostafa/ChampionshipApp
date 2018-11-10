var mongoose = require('mongoose');
var team = require('../teams/teams-model').teamSchema;

var matchSchema = mongoose.Schema({
  team1: team,
  team2: team
});

module.exports = {
  matchSchema
};

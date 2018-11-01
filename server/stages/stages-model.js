var mongoose = require('mongoose');

var StageSchema = mongoose.Schema({
  name: String,
  type: String,
  no_in_teams: Number,
  no_out_teams: Number,
  no_of_groups: Number,
  no_of_legs: Number
});

module.exports = StageSchema;

var mongoose = require('mongoose');
var tournament = require('../tournament/tournament-model').tournamentSchema;

var championshipSchema = mongoose.Schema({
  name: String,
  tournaments: [tournament]
});

module.exports = {
  championshipModel: mongoose.model("championships", championshipSchema),
  championshipSchema
};

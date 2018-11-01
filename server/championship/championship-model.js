var mongoose = require('mongoose');
var tournament = require('../tournament/tournament-model');

var ChampionshipSchema = mongoose.Schema({
  name: String,
  tournaments: [tournament]
});

module.exports = mongoose.model("championships", ChampionshipSchema);

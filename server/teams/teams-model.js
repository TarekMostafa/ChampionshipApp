var mongoose = require('mongoose');

var TeamsSchema = mongoose.Schema({
  _id: Number,
  name: String,
  continent: String,
  flag_location: String,
  iso_code: String,
  is_active: Boolean,
  is_national: Boolean
});

module.exports = {
  teamModel: mongoose.model("teams", TeamsSchema),
  teamSchema: TeamsSchema
}

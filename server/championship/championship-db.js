var championshipModel = require('./championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');

var addChampionship = function (inChampionship, callBack) {
  mongooseConnection.open()
  .then(function() {
    var championship = new championshipModel ({name:inChampionship.name});
    return championship.save();
  })
  .then(function() {
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error) {
    console.log("mongoose [addChampionship] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

var editChampionship = function (inChampionship, callBack) {
  mongooseConnection.open()
  .then(function(){
    return championshipModel.findOneAndUpdate({_id: inChampionship._id},
      {$set:{name:inChampionship.name}});
  })
  .then(function(){
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error){
    console.log("mongoose [editChampionship] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

var getChampionships = function (callBack) {
  mongooseConnection.open()
  .then(function(){
    return championshipModel.find({}, {"tournaments.tournament_teams": 0, "tournaments.stages":0});
  })
  .then(function(championships){
    mongooseConnection.close();
    callBack(null, championships);
  })
  .catch(function(error){
    console.log("mongoose [getChampionships] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  addChampionship,
  editChampionship,
  getChampionships
}

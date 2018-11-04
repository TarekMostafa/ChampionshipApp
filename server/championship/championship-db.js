var championshipModel = require('./championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');

var addChampionship = function (addChampionshipModel, callBack) {
  mongooseConnection.open()
  .then(function() {
    var championship = new championshipModel (addChampionshipModel);
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

var editChampionship = function (championship, callBack) {
  mongooseConnection.open()
  .then(function(){
    return championshipModel.findOneAndUpdate({_id: championship._id},
      {$set:{name:championship.name}});
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

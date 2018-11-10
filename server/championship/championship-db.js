var championshipModel = require('./championship-model');
var logger = require('../global-modules/winston-logger');

var addChampionship = function (addChampionshipModel, callBack) {
  var championship = new championshipModel (addChampionshipModel);
  championship.save()
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [addChampionship] : " + error);
    callBack(error);
  });
}

var editChampionship = function (championship, callBack) {
  championshipModel.findOneAndUpdate(
    {_id: championship._id},
    {$set:{name:championship.name}}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error){
    logger.error("mongoose [editChampionship] : " + error);
    callBack(error);
  });
}

var getChampionships = function (callBack) {
  championshipModel.find(
    {},
    {"tournaments.tournament_teams": 0, "tournaments.stages":0}
  )
  .then(function(championships){
    callBack(null, championships);
  })
  .catch(function(error){
    logger.error("mongoose [getChampionships] : " + error);
    callBack(error);
  });
}

module.exports = {
  addChampionship,
  editChampionship,
  getChampionships
}

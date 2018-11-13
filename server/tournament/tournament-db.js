var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

var addTournament = function (params, callBack){
  championshipModel.findOneAndUpdate(
    {_id: params.championshipId},
    {$push: {tournaments: params.tournament}}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [addTournament] : " + error);
    callBack(error);
  });
}

var editTournament = function (params, callBack){
  var updateObj = {
    "tournaments.$[elem].name": params.tournament.name,
    "tournaments.$[elem].no_of_teams": params.tournament.no_of_teams,
    "tournaments.$[elem].year": params.tournament.year
  };

  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(params.tournament._id) } ];

  championshipModel.findOneAndUpdate(
    {_id: params.championshipId},
    {$set: updateObj},
    {arrayFilters : arrayFilters, returnNewDocument: true}
  )
  .then(function(){
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [editTournament] : " + error);
    callBack(error);
  });
}

var getTournament = function (params, callBack){
  championshipModel.findOne(
    {
      "_id": mongoose.Types.ObjectId(params.championshipId),
      "tournaments": { $elemMatch: {_id:mongoose.Types.ObjectId(params.tournamentId)} }
    },
    {
      "name" : 1, "tournaments.$" : 1
    }
  )
  .then(function(championship){
    callBack(null, championship);
  })
  .catch(function(error) {
    logger.error("mongoose [getTournament] : " + error);
    callBack(error);
  });
}

module.exports = {
  addTournament,
  editTournament,
  getTournament
}

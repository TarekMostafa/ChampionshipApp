var mongoose = require('mongoose');
var _ = require('lodash');
var logger = require('../global-modules/winston-logger');
var championshipModel = require('../championship/championship-model').championshipModel;

// Add Tournament to existing Championship
var addTournament = function (params, callBack){
  // Validate input parameter
  // Check Championshipid
  if(_.isNil(params.championshipId) || _.isEmpty(params.championshipId)) {
    callBack(400);
    return;
  }
  // Check Tournament Object
  if(_.isNil(params.tournament) || _.isEmpty(params.tournament)) {
    callBack(400);
    return;
  }
  // Check Tournament Fields
  if(_.isNil(params.tournament.name) ||
  _.isNil(params.tournament.no_of_teams) ||
  _.isNil(params.tournament.year)) {
    callBack(400);
    return;
  }
  // Push Tournament
  championshipModel.findOneAndUpdate(
    {_id: params.championshipId},
    {$push: {tournaments: {
      name: params.tournament.name,
      no_of_teams: params.tournament.no_of_teams,
      year: params.tournament.year
    }}}
  )
  .then(function(updatedObj){
    if(_.isNull(updatedObj)) {
      throw "Invalid Championship Id [" + params.championshipId + "]";
    }
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [addTournament] : " + error);
    callBack(500);
  });
}

var editTournament = function (params, callBack){
  // Validate input parameter
  // Check Championshipid
  if(_.isNil(params.championshipId) || _.isEmpty(params.championshipId)) {
    callBack(400);
    return;
  }
  // Check Tournament Object
  if(_.isNil(params.tournament) || _.isEmpty(params.tournament)) {
    callBack(400);
    return;
  }
  // Check Tournament Id
  if(_.isNil(params.tournament._id) || _.isEmpty(params.tournament._id)) {
    callBack(400);
    return;
  }
  // Check Tournament Fields
  if(_.isNil(params.tournament.name) ||
  _.isNil(params.tournament.no_of_teams) ||
  _.isNil(params.tournament.year)) {
    callBack(400);
    return;
  }
  // Construct Update Object
  var updateObj = {
    "tournaments.$[elem].name": params.tournament.name,
    "tournaments.$[elem].no_of_teams": params.tournament.no_of_teams,
    "tournaments.$[elem].year": params.tournament.year
  };
  // Set Array Filters
  var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(params.tournament._id) } ];
  // Update Tournament
  championshipModel.findOneAndUpdate(
    {_id: params.championshipId},
    {$set: updateObj},
    {arrayFilters : arrayFilters, returnNewDocument: true}
  )
  .then(function(updatedObj){
    if(_.isNull(updatedObj)) {
      throw "Invalid Championship Id [" + params.championshipId + "] and " +
        "Tournament Id [" + params.tournament._id + "]";
    }
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [editTournament] : " + error);
    callBack(500);
  });
}

var getTournament = function (params, callBack){
  // Validate input parameters
  // Check Championshipid
  if(_.isNil(params.championshipId) || _.isEmpty(params.championshipId)) {
    callBack(400);
    return;
  }
  // Check Tournament Id
  if(_.isNil(params.tournamentId) || _.isEmpty(params.tournamentId)) {
    callBack(400);
    return;
  }
  // Retrieve the Tournament
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
    callBack(500);
  });
}

module.exports = {
  addTournament,
  editTournament,
  getTournament
}

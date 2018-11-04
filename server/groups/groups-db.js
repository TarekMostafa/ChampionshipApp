var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var saveGroups = function (saveGroupsModel, callBack) {
  mongooseConnection.open()
  .then(function(){
    var updateObj = {
      "tournaments.$[elem].stages.$[stage].groups": saveGroupsModel.groups
    };

    var arrayFilters = [ {"elem._id": mongoose.Types.ObjectId(saveGroupsModel.tournamentId)},
                         {"stage._id": mongoose.Types.ObjectId(saveGroupsModel.stageId)} ];

    return championshipModel.findOneAndUpdate({},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true});
  })
  .then(function(){
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error) {
    console.log("mongoose [saveGroups] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  saveGroups
}

var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var saveGroups = function (groupsObj, callBack) {
  mongooseConnection.open(function(connection_error) {
    if (connection_error) {
      callBack(connection_error);
      return;
    }

    console.log(groupsObj.groups[0].group_teams);

    var updateObj = {
      "tournaments.$[elem].stages.$[stage].groups": groupsObj.groups
    };

    var arrayFilters = [ {"elem._id": mongoose.Types.ObjectId(groupsObj.tournamentId)},
                         {"stage._id": mongoose.Types.ObjectId(groupsObj.stageId)} ];

    championshipModel.findOneAndUpdate({},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}, function(err, obj){
        mongooseConnection.close();
        if (err) {
          console.log(err);
          callBack(err);
        } else {
          callBack(null);
        }
      });
  });
}

module.exports = {
  saveGroups
}

var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var saveStages = function (stagesObj, callBack) {
  mongooseConnection.open(function(connection_error) {
    if (connection_error) {
      callBack(connection_error);
      return;
    }

    var updateObj = {
      "tournaments.$[elem].stages": stagesObj.stages
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(stagesObj.tournamentId) } ];

    championshipModel.findOneAndUpdate({},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true}, function(err, obj){
        mongooseConnection.close();
        if (err) {
          callBack(err);
        } else {
          callBack(null);
        }
      });
  });
}

module.exports = {
  saveStages
}

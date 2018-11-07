var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');
var logger = require('../global-modules/winston-logger');

var saveStages = function (saveStagesModel, callBack) {
  mongooseConnection.open()
  .then(function(){
    var updateObj = {
      "tournaments.$[elem].stages": saveStagesModel.stages,
      "tournaments.$[elem].current_stage": 0
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(saveStagesModel.tournamentId) } ];

    return championshipModel.findOneAndUpdate({},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true});
  })
  .then(function(){
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error) {
    logger.error("mongoose [saveStages] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  saveStages
}

var championshipModel = require('../championship/championship-model');
var mongooseConnection = require('../global-modules/mongoose-connection');
var mongoose = require('mongoose');

var saveStages = function (stagesObj, callBack) {
  mongooseConnection.open()
  .then(function(){
    var updateObj = {
      "tournaments.$[elem].stages": stagesObj.stages,
      "tournaments.$[elem].current_stage": 0
    };

    var arrayFilters = [ { "elem._id": mongoose.Types.ObjectId(stagesObj.tournamentId) } ];

    return championshipModel.findOneAndUpdate({},
      {$set: updateObj}, {arrayFilters : arrayFilters, returnNewDocument: true, upsert:true});
  })
  .then(function(){
    mongooseConnection.close();
    callBack(null);
  })
  .catch(function(error) {
    console.log("mongoose [saveStages] : " + error);
    mongooseConnection.close();
    callBack(error);
  });
}

module.exports = {
  saveStages
}

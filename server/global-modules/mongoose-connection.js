var mongoose = require('mongoose');
var uri = 'mongodb://localhost:27017/Championshipdb';

var open = function(callBack){
  mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false })
  .then(function(){
    console.log("connected successfully to mongoose");
    callBack(null);
  })
  .catch(function(err){
    console.log("From mongoose-connection : " + err);
    callBack(err);
  });
}

var close = function(){
  mongoose.disconnect();
}

module.exports = {
  open, close
}

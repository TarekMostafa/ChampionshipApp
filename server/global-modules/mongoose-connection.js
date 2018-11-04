var mongoose = require('mongoose');
var uri = 'mongodb://localhost:27017/Championshipdb';
var options = {useNewUrlParser: true, useFindAndModify: false};

var open = function(){
  return mongoose.connect(uri, options);
}

var close = function() {
  mongoose.connection.close();
}

module.exports = {
  open, close
}

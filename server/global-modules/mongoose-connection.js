var mongoose = require('mongoose');
var logger = require('./winston-logger');
var uri = 'mongodb://localhost:27017/Championshipdb';
var options = {useNewUrlParser: true, useFindAndModify: false};


var open = function(){
  return mongoose.connect(uri, options);
}

var close = function() {
  mongoose.connection.close();
}

mongoose.connection.on('connected', function(){
  logger.verbose("New connection established successfully");
});

mongoose.connection.on('disconnected', function(){
  logger.verbose("Connection has been closed successfully");
});

module.exports = {
  open, close
}

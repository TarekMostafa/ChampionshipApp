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

mongoose.connection.on('connecting', function(){
    logger.verbose("Mongoose trying to establish a connection");
});

mongoose.connection.on('connected', function(){
  logger.verbose("Mongoose connection is established successfully");
});

mongoose.connection.on('error', function(err){
  logger.error("Mongoose connection error: " + err);
});

mongoose.connection.on('disconnected', function(){
  logger.error("Mongoose connection is disconnected");
});

module.exports = {
  open, close
}

var express = require('express');
var teamsCtrl = require('./server/teams/teams-controller');
var championshipCtrl = require('./server/championship/championship-controller');
var tournamentCtrl = require('./server/tournament/tournament-controller');
var tournamentTeamsCtrl = require('./server/tournament-teams/tournament-teams-controller');
var stagesCtrl = require('./server/stages/stages-controller');
var groupsCtrl = require('./server/groups/groups-controller');
var bodyParser = require('body-parser');
var logger = require('./server/global-modules/winston-logger');

var app = express();

// parse application/json
app.use(bodyParser.json());
// Static Files
app.use('/client', express.static('client'));
app.use('/node_modules', express.static('node_modules'));
// Teams Router
app.use('/teams', teamsCtrl);
// Championship Router
app.use('/championship', championshipCtrl);
// Tournament Router
app.use('/tournament', tournamentCtrl);
// Tournament Teams Router
app.use('/tournament-teams', tournamentTeamsCtrl);
// Stages Router
app.use('/stages', stagesCtrl);
// Groups Router
app.use('/groups', groupsCtrl);
// Home Page Route
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function(){
  logger.info("Championship Server listening now on port 3000");
});

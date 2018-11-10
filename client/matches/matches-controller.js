(function () {
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("matchesController", function(tournament,
    championshipParamService){

    var _this = this;
    this.flagsServerPath = championshipParamService.flagsServerPath;
    this.tournament = tournament;
    this.matches = [];
    this.disableGenerate = false;

    this.match = function () {
      this.team1 = {},
      this.team2 = {}
    }

    this.generateMatches = function () {
      _this.disableGenerate = true;
      var currentStage = _this.tournament.stages[tournament.current_stage];
      var groups = currentStage.groups;
      for(let group of groups){
        let totalRounds = (group.group_teams.length - 1) * currentStage.no_of_legs;
        let matchesPerRound = group.group_teams.length / 2;
        for(let r = 0; r < totalRounds; r++){
          for(let m = 0; m < matchesPerRound; m++){
            let home = (r+m) % (group.group_teams.length - 1);
            let away = 0;
            if(m === 0){
              away = (group.group_teams.length - 1);
            } else {
              away = (group.group_teams.length - 1 - m + r) % (group.group_teams.length - 1);
            }
            let match = new _this.match();
            match.team1 = group.group_teams[home].team;
            match.team2 = group.group_teams[away].team;
            _this.matches.push(match);
          }
        }
      }
    }

  });
})();

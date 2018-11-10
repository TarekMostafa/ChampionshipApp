(function () {
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("matchesController", function(championship,
    championshipParamService, matchesHttpService){

    var _this = this;
    this.flagsServerPath = championshipParamService.flagsServerPath;
    this.tournament = championship.tournaments[0];
    this.currentStage = _this.tournament.current_stage;
    this.matches = [];
    this.disableGenerate = false;

    this.extractMatchesfromStage = function () {
      _this.matches = [];
      for(let group of _this.currentStage.groups) {
        _this.matches = _this.matches.concat(group.group_matches);
      }
    }

    this.generateMatches = function () {
      _this.disableGenerate = true;
      matchesHttpService.generateMatches(championship._id, _this.tournament._id, _this.currentStage._id)
      .then(function(response){
        _this.currentStage = response.data;
        _this.extractMatchesfromStage();
      })
      .catch(function(err){
      });
    }

  });
})();

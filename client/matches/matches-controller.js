(function () {
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("matchesController", function(championship,
    championshipParamService, matchesHttpService, $mdToast){

    var _this = this;
    this.flagsServerPath = championshipParamService.flagsServerPath;
    this.tournament = championship.tournaments[0];
    this.currentStage = _this.tournament.current_stage;
    this.disableGenerate = false;

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

    this.saveMatches = function () {
      matchesHttpService.saveMatches(championship._id, _this.tournament._id, _this.currentStage._id)
      .then(function(response){
        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      })
      .catch(function(err){
        $mdToast.show($mdToast.simple().textContent(err).hideDelay(3000));
      })
    }

  });
})();

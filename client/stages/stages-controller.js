(function () {
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("stagesController", function(championship, $mdDialog,
    stagesHttpService, $mdToast){

    var _this = this;
    this.tournament = championship.tournaments[0];
    this.stages = this.tournament.stages;

    this.saveStages = function () {
      // Call Http post request
      stagesHttpService.saveStages(championship._id, _this.tournament._id, _this.stages)
      .then(function(response){
        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      })
      .catch(function(err){
        $mdToast.show($mdToast.simple().textContent(err).hideDelay(3000));
      })
    }

    this.addStage = function (ev) {
      $mdDialog.show({
        locals: {no_of_teams: (_this.stages.length <=0? _this.tournament.no_of_teams:
           _this.stages[_this.stages.length-1].no_out_teams)},
        controller: "stageAddController as stageAddCtrl",
        templateUrl: '/client/stages/stage-add-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        //fullscreen: _this.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(stage) {
        stage._id = _this.stages.length + 1;
        _this.stages.push(stage);
      }, function() {
        //'You cancelled the dialog.'
      });
    }

    this.removeStage = function () {
      _this.stages.pop();
    }

  });
})();

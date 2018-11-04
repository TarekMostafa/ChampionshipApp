(function () {
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("stagesController", function(tournament, $mdDialog,
    stagesHttpService, $mdToast){

    var _this = this;
    this.tournament = tournament;
    this.stages = tournament.stages;

    this.saveStages = function () {
      var saveStagesModel = new stagesHttpService.saveStagesModel();
      saveStagesModel.tournamentId = _this.tournament._id;
      saveStagesModel.stages = _this.stages;
      // Call Http post request
      stagesHttpService.saveStages(saveStagesModel)
      .then(function(response){
        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      })
      .catch(function(err){
        $mdToast.show($mdToast.simple().textContent(err).hideDelay(3000));
      })
    }

    this.addStage = function (ev) {
      $mdDialog.show({
        locals: {no_of_teams: (_this.stages.length <=0? tournament.no_of_teams:
           _this.stages[_this.stages.length-1].no_out_teams)},
        controller: "stageAddController as stageAddCtrl",
        templateUrl: '/client/stages/stage-add-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        //fullscreen: _this.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(stage) {
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

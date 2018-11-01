(function () {
  myApp = angular.module("championshipApp");
  myApp.controller("stageAddController", function($mdDialog, no_of_teams){

    var _this = this;

    this.cancel = function() {
      if(!_this.disableAddButton)
        $mdDialog.cancel();
    };

    this.addDialog = function() {
      _this.disableAddButton = true;
      $mdDialog.hide(_this.stage);
    };

    this.stageTypeChange = function() {
      if(_this.stage.type === "Knockout"){
        _this.Knockout_readonly = true;
        _this.stage.no_out_teams = (_this.stage.no_in_teams/2);
        _this.stage.no_of_groups = 1;
      } else {
        _this.Knockout_readonly = false;
      }
    }

    this.stage = {
      name: "",
      type: "",
      no_in_teams: no_of_teams,
      no_out_teams: 0,
      no_of_groups: 0,
      no_of_legs: 0
    };
    this.stageTypes = ['League', 'Knockout'];
    this.title = "Add";
    this.disableAddButton = false;
    this.Knockout_readonly = false;

  });
})();

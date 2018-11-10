(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("stagesHttpService", function($http){

    this.getStageModel = function () {
      this._id = 0;
      this.name = "";
      this.type = "";
      this.no_in_teams = 0;
      this.no_out_teams = 0;
      this.no_of_groups = 0;
      this.no_of_legs = 0;
    }

    this.saveStagesModel = function () {
      this.tournamentId = "";
      this.stages = [];
    }

    this.saveStages = function (saveStagesModel){
      return $http({
        url: '/stages',
        method: 'POST',
        dataType: 'json',
        data: {
          saveStagesModel: saveStagesModel
        }
      });
    }

  });
})();

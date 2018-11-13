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

    this.saveStages = function (championshipId, tournamentId, stages){
      return $http({
        url: '/stages',
        method: 'POST',
        dataType: 'json',
        data: {
          championshipId: championshipId,
          tournamentId: tournamentId,
          stages: stages
        }
      });
    }

  });
})();

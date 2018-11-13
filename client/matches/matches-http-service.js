(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("matchesHttpService", function($http){

    this.generateMatches = function (championshipId, tournamentId, stageId){
      return $http({
        url: '/matches/generateMatches',
        method: 'GET',
        params: {
          championshipId: championshipId,
          tournamentId: tournamentId,
          stageId: stageId
        }
      });
    }

    this.saveMatches = function (championshipId, tournamentId, stageId) {
      return $http({
        url: '/matches',
        method: 'POST',
        dataType: 'json',
        data: {
          championshipId: championshipId,
          tournamentId: tournamentId,
          stageId: stageId
        }
      });
    }

  });
})();

(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("matchesHttpService", function($http){

    this.generateMatches = function (championshipId, tournamentId, stageId){
      return $http({
        url: 'matches/generateMatches',
        method: 'GET',
        params: {
          championshipId: championshipId,
          tournamentId: tournamentId,
          stageId: stageId
        }
      });
    }

  });
})();

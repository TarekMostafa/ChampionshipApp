(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("tournamentTeamsHttpService", function($http){

    this.saveTournamentTeams = function (championshipId, tournamentId,
      tournamentTeams){
      return $http({
        url: '/tournament-teams',
        method: 'POST',
        dataType: 'json',
        data: {
          championshipId: championshipId,
          tournamentId: tournamentId,
          tournamentTeams: tournamentTeams
        }
      });
    }

  });
})();

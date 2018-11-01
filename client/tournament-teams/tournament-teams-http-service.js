(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("tournamentTeamsHttpService", function($http){

    this.saveTournamentTeams = function (inTournamentTeamsObj){
      return $http({
        url: '/tournament-teams',
        method: 'POST',
        dataType: 'json',
        data: {
          tournamentTeamsObj: inTournamentTeamsObj
        }
      });
    }

  });
})();

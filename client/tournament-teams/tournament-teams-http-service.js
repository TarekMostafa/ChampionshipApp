(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("tournamentTeamsHttpService", function($http){

    this.saveTournamentTeamsModel = function () {
      this.championshipId = "";
      this.tournamentId = "";
      this.tournamentTeams = [];
    }

    this.saveTournamentTeams = function (saveTournamentTeamsModel){
      return $http({
        url: '/tournament-teams',
        method: 'POST',
        dataType: 'json',
        data: {
          saveTournamentTeamsModel: saveTournamentTeamsModel
        }
      });
    }

  });
})();

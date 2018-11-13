(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("tournamentHttpService", function($http){

    this.getTournamentModel = function () {
      this.name = "";
      this.no_of_teams = 0;
      this.year = 0;
      this.current_stage = null;
    }

    this.addTournament = function (championshipId, tournament){
      return $http({
        url: '/tournament',
        method: 'PUT',
        dataType: 'json',
        data: {
          championshipId: championshipId,
          tournament: tournament
        }
      });
    }

    this.editTournament = function (championshipId, tournament){
      return $http({
        url: '/tournament',
        method: 'POST',
        dataType: 'json',
        data: {
          championshipId: championshipId,
          tournament: tournament
        }
      });
    }

    this.getTournament = function (championshipId, tournamentId) {
      return $http({
        url: '/tournament',
        method: 'GET',
        params: {
          championshipId: championshipId,
          tournamentId: tournamentId
        }
      });
    }

  });
})();

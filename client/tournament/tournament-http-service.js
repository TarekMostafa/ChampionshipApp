(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("tournamentHttpService", function($http){

    this.getTournamentModel = function () {
      this.name = "";
      this.no_of_teams = 0;
      this.year = 0;
      this.current_stage = null;
    }

    this.addTournamentModel = function () {
      this.championshipId = "";
      this.tournament = {};
    }

    this.editTournamentModel = function () {
      this.championshipId = "";
      this.tournament = {};
    }

    this.addTournament = function (addTournamentModel){
      return $http({
        url: '/tournament',
        method: 'PUT',
        dataType: 'json',
        data: {
          addTournamentModel: addTournamentModel
        }
      });
    }

    this.editTournament = function (editTournamentModel){
      return $http({
        url: '/tournament',
        method: 'POST',
        dataType: 'json',
        data: {
          editTournamentModel: editTournamentModel
        }
      });
    }

    this.getTournament = function (inTournamentId){
      return $http({
        url: '/tournament/'+inTournamentId,
        method: 'GET'
      });
    }

  });
})();

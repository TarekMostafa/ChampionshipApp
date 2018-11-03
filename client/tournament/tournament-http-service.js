(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("tournamentHttpService", function($http){

    this.getTournamentViewModel = function () {
      return {
        championshipId: "",
        tournament: {}
      }
    }

    this.addTournament = function (inTournamentObj){
      return $http({
        url: '/tournament',
        method: 'PUT',
        dataType: 'json',
        data: {
          tournamentObj: inTournamentObj
        }
      });
    }

    this.editTournament = function (inTournamentObj){
      return $http({
        url: '/tournament',
        method: 'POST',
        dataType: 'json',
        data: {
          tournamentObj: inTournamentObj
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

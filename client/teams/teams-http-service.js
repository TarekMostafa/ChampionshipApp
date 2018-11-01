(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("teamHttpService", function($http){

    this.getTeams = function(inTeamName, inContinent, inLimit, inSkip) {
      return $http({
        url: '/teams',
        method: 'GET',
        params: {
          teamName: inTeamName,
          continent: inContinent,
          limit: inLimit,
          skip: inSkip
        }
      });
    }

    this.getTeamsContinents = function(){
      return $http({
        url: '/teams/continents',
        method: 'GET'
      });
    }

  });
})();

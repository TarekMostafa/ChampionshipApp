(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("teamHttpService", function($http){

    this.getTeamsSearchModel = function () {
      this.name = "";
      this.continent = "";
      this.limit = 18;
      this.skip = 0;
    }

    this.getTeams = function(teamsSearchModel) {
      return $http({
        url: '/teams',
        method: 'GET',
        params: {teamsSearchModel}
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

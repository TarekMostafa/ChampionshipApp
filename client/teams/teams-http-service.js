(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("teamHttpService", function($http){

    this.getTeams = function(name, continent, skip, limit) {
      return $http({
        url: '/teams',
        method: 'GET',
        params: {
          name: name,
          continent: continent,
          skip: skip,
          limit: limit
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

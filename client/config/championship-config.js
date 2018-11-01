(function (){
  var myApp = angular.module("championshipApp");
  myApp.config(function($routeProvider){
    $routeProvider.when("/home", {
      templateUrl: "/client/home/home-page.html",
      controller: "homePageController as homePageCtrl",
      caseInsensitiveMatch: true
    })
    .when("/teams", {
      templateUrl: "/client/teams/teams-list-page.html",
      controller: "teamsListPageController as teamsListPageCtrl",
      caseInsensitiveMatch: true
    })
    .when("/admin", {
      templateUrl: "/client/admin/admin-page.html",
      controller: "adminPageController as adminPageCtrl",
      caseInsensitiveMatch: true
    })
    .when("/tournament-details/:tournamentId", {
      templateUrl: "/client/tournament-details/tournament-details-page.html",
      controller: "tournamentDetailsController as tournamentDetailsCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        tournament: function($route, tournamentHttpService) {
          return tournamentHttpService.getTournament($route.current.params.tournamentId)
          .then(function(response){
            return response.data;
          })
          .catch(function(err){
            return null;
          });
        }
      }
    })
    .when("/tournament-teams/:tournamentId", {
      templateUrl: "/client/tournament-teams/tournament-teams-page.html",
      controller: "tournamentTeamsController as tournamentTeamsCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        tournament: function($route, tournamentHttpService){
          return tournamentHttpService.getTournament($route.current.params.tournamentId)
          .then(function(response){
            return response.data;
          })
          .catch(function(err){
            return null;
          });
        }
      }
    })
    .when("/stages/:tournamentId", {
      templateUrl: "/client/stages/stages-page.html",
      controller: "stagesController as stagesCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        tournament: function($route, tournamentHttpService){
          return tournamentHttpService.getTournament($route.current.params.tournamentId)
          .then(function(response){
            return response.data;
          })
          .catch(function(err){
            return null;
          });
        }
      }
    })
    .otherwise({
      redirectTo: "/home"
    })
  });

})();

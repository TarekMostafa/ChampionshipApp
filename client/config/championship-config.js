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
    .when("/tournament-details", {
      templateUrl: "/client/tournament-details/tournament-details-page.html",
      controller: "tournamentDetailsController as tournamentDetailsCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        championship: function($route, tournamentHttpService) {
          var tournamentSearchModel = new tournamentHttpService.tournamentSearchModel();
          tournamentSearchModel.championshipId = $route.current.params.championshipId;
          tournamentSearchModel.tournamentId = $route.current.params.tournamentId;
          tournamentSearchModel.loadTournamentTeams = true;
          tournamentSearchModel.loadStages = true;
          tournamentSearchModel.loadGroups = true;
          return tournamentHttpService.getTournament(tournamentSearchModel)
          .then(function(response){
            return response.data;
          })
          .catch(function(err){
            return null;
          });
        }
      }
    })
    .when("/tournament-teams", {
      templateUrl: "/client/tournament-teams/tournament-teams-page.html",
      controller: "tournamentTeamsController as tournamentTeamsCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        championship: function($route, tournamentHttpService){
          var tournamentSearchModel = new tournamentHttpService.tournamentSearchModel();
          tournamentSearchModel.championshipId = $route.current.params.championshipId;
          tournamentSearchModel.tournamentId = $route.current.params.tournamentId;
          tournamentSearchModel.loadTournamentTeams = true;
          return tournamentHttpService.getTournament(tournamentSearchModel)
          .then(function(response){
            return response.data;
          })
          .catch(function(err){
            return null;
          });
        }
      }
    })
    .when("/stages", {
      templateUrl: "/client/stages/stages-page.html",
      controller: "stagesController as stagesCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        championship: function($route, tournamentHttpService){
          var tournamentSearchModel = new tournamentHttpService.tournamentSearchModel();
          tournamentSearchModel.championshipId = $route.current.params.championshipId;
          tournamentSearchModel.tournamentId = $route.current.params.tournamentId;
          tournamentSearchModel.loadStages = true;
          tournamentSearchModel.loadGroups = true;
          return tournamentHttpService.getTournament(tournamentSearchModel)
          .then(function(response){
            return response.data;
          })
          .catch(function(err){
            return null;
          });
        }
      }
    })
    .when("/groups", {
      templateUrl: "/client/groups/groups-page.html",
      controller: "groupsController as groupsCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        championship: function($route, tournamentHttpService){
          var tournamentSearchModel = new tournamentHttpService.tournamentSearchModel();
          tournamentSearchModel.championshipId = $route.current.params.championshipId;
          tournamentSearchModel.tournamentId = $route.current.params.tournamentId;
          tournamentSearchModel.loadTournamentTeams = true;
          return tournamentHttpService.getTournament(tournamentSearchModel)
          .then(function(response){
            return response.data;
          })
          .catch(function(err){
            return null;
          });
        }
      }
    })
    .when("/matches", {
      templateUrl: "/client/matches/matches-page.html",
      controller: "matchesController as matchesCtrl",
      caseInsensitiveMatch: true,
      resolve: {
        championship: function($route, tournamentHttpService){
          var tournamentSearchModel = new tournamentHttpService.tournamentSearchModel();
          tournamentSearchModel.championshipId = $route.current.params.championshipId;
          tournamentSearchModel.tournamentId = $route.current.params.tournamentId;
          tournamentSearchModel.loadTournamentTeams = true;
          tournamentSearchModel.loadStages = true;
          tournamentSearchModel.loadGroups = true;
          return tournamentHttpService.getTournament(tournamentSearchModel)
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

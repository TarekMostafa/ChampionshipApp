(function () {
  var myApp = angular.module("championshipApp");
  myApp.directive("matchDirective", function(){
    return {
      restrict: 'E',
      scope: {
        team1: '=',
        team2: '=',
        flagsserverpath: '@',
        mode: '@'
      },
      templateUrl: "/client/matches/match-directive.html",
    }
  });
})();

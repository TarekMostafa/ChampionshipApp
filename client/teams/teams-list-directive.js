(function () {
  var myApp = angular.module("championshipApp");
  myApp.directive("teamsListDirective", function(){
    return {
      restrict: 'E',
      scope: {
        teams: '=',
        view: '@',
        flagsserverpath: '@',
        remove: '@'
      },
      templateUrl: "/client/teams/teams-list-directive.html",
      link: function($scope, element, attrs){
        $scope.removeTeam = function(index){
          $scope.teams.splice(index,1);
        }
      }
    }
  });
})();

(function () {
  var myApp = angular.module("championshipApp");
  myApp.directive("groupsDirective", function(){
    return {
      restrict: 'E',
      scope: {
        groups: '=',
        flagsserverpath: '@',
        edit: '@',
        removeFn: '='
      },
      templateUrl: "/client/groups/groups-directive.html"
    }
  });
})();

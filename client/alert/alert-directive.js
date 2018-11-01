(function () {
  var myApp = angular.module("championshipApp");
  myApp.directive("alertDirective", function(){
    return {
      restrict: 'E',
      scope: {
        message: '@'
      },
      templateUrl: "/client/alert/alert-directive.html"
    }
  });
})();

(function(){
  myApp = angular.module("championshipApp");
  myApp.controller("navController", function($mdSidenav, $location){

    _this = this;

    this.toggleSidenav = function(){
      $mdSidenav('left').toggle();
    }

    this.items = [
      {title: "Home", navigation: "#!home"},
      {title: "Teams", navigation: "#!teams"},
      {title: "Admin", navigation: "#!admin"}
    ]

  });
})();

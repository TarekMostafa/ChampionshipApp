(function(){
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("navController", function($mdSidenav, $location){

    var _this = this;

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

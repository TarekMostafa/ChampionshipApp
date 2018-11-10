(function (){
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("adminButtomSheetController", function($mdBottomSheet,
    $window, championship, tournament){

    this.queryString = "?championshipId=" + championship._id +
      "&tournamentId=" + tournament._id;

    // Navigation Items
    this.items = [
      {title: "Teams", navigation: "#!tournament-teams" + this.queryString},
      {title: "Stages", navigation: "#!stages" + this.queryString},
      {title: "Groups", navigation: "#!groups" + this.queryString},
      {title: "Matches", navigation: "#!matches" + this.queryString},
    ];

    this.itemNavigation = function (navigation) {
      $window.location.href = navigation;
      $mdBottomSheet.hide();
    };

  });
})();

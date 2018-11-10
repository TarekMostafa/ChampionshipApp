(function (){
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("adminButtomSheetController", function($mdBottomSheet,
    $window, tournament){

    // Navigation Items
    this.items = [
      {title: "Teams", navigation: "#!tournament-teams/"+tournament._id},
      {title: "Stages", navigation: "#!stages/"+tournament._id},
      {title: "Groups", navigation: "#!groups/"+tournament._id},
      {title: "Matches", navigation: "#!matches/"+tournament._id},
    ];

    this.itemNavigation = function (navigation) {
      $window.location.href = navigation;
      $mdBottomSheet.hide();
    };

  });
})();

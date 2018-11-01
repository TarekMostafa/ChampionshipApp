(function (){
  var myApp = angular.module("championshipApp");
  myApp.controller("adminButtomSheetController", function($mdBottomSheet, $window,
    tournament){

    var _this = this;

    this.itemNavigation = function (navigation) {
      $window.location.href = navigation;
      $mdBottomSheet.hide();
    };

    this.items = [
      {title: "Teams", navigation: "#!tournament-teams/"+tournament._id},
      {title: "Stages", navigation: "#!stages/"+tournament._id},
      {title: "Groups & Matches", navigation: ""},
    ];

  });
})();

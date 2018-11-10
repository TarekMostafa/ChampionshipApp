(function (){
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("adminPageController", function ($mdBottomSheet, $mdDialog,
    $mdToast, championshipHttpService){

    var _this = this;
    this.championships = [];
    this.selectedChampionship = "";
    this.selectedTournament = "";

    this.showGridBottomSheet = function () {
      $mdBottomSheet.show({
        locals: {
          championship: _this.selectedChampionship,
          tournament: _this.selectedTournament
        },
        templateUrl: '/client/admin/admin-buttom-sheet-template.html',
        controller: 'adminButtomSheetController as adminButtomSheetCtrl'
      }).then(function(clickedItem) {
      }).catch(function(error) {
      });
    }

    this.showAddChampionshipDialog = function(ev) {
      $mdDialog.show({
        controller: "addChampionshipController as addChampionshipCtrl",
        templateUrl: '/client/championship/championship-add-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        //fullscreen: _this.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        _this.loadChampionships();
        $mdToast.show($mdToast.simple().textContent(answer).hideDelay(3000));
      }, function() {
        //'You cancelled the dialog.'
      });
    };

    this.showEditChampionshipDialog = function(ev, selectedChampionship) {
      $mdDialog.show({
        locals: { selectedChampionship: selectedChampionship },
        controller: "editChampionshipController as editChampionshipCtrl",
        templateUrl: '/client/championship/championship-edit-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        //fullscreen: _this.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        _this.loadChampionships();
        $mdToast.show($mdToast.simple().textContent(answer).hideDelay(3000));
      }, function() {
        //'You cancelled the dialog.'
      });
    };

    this.showAddTournamentDialog = function(ev) {
      $mdDialog.show({
        locals: {
          championships: _this.championships,
        } ,
        controller: "addTournamentController as addTournamentCtrl",
        templateUrl: '/client/tournament/tournament-add-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false
        //fullscreen: _this.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        _this.loadChampionships();
        $mdToast.show($mdToast.simple().textContent(answer).hideDelay(3000));
      }, function() {
        //'You cancelled the dialog.'
      });
    };

    this.showEditTournamentDialog = function(ev, selectedChampionship,
      selectedTournament) {
      $mdDialog.show({
        locals: {
          championships: _this.championships,
          selectedChampionship: selectedChampionship,
          selectedTournament: selectedTournament
        } ,
        controller: "editTournamentController as editTournamentCtrl",
        templateUrl: '/client/tournament/tournament-edit-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false
        //fullscreen: _this.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        _this.loadChampionships();
        $mdToast.show($mdToast.simple().textContent(answer).hideDelay(3000));
      }, function() {
        //'You cancelled the dialog.'
      });
    };

    this.loadChampionships = function() {
      _this.selectedChampionship = "";
      _this.selectedTournament = "";
      championshipHttpService.getChampionships()
      .then(function(response){
        _this.championships = response.data;
      }).catch(function(err){
      });
    }

    this.loadChampionships();

  })
})();

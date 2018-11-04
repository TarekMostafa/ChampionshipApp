(function (){
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("editChampionshipController", function($mdDialog,
    championshipHttpService, selectedChampionship){

    var _this = this;
    this.championship = selectedChampionship;
    this.title = "Edit";
    this.disableSaveButton = false;

    this.cancel = function() {
      if(!_this.disableSaveButton)
        $mdDialog.cancel();
    };

    this.saveDialog = function() {
      _this.disableSaveButton = true;
      // Call Championship Service to edit Championship
      championshipHttpService.editChampionship(_this.championship)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

  });
})();

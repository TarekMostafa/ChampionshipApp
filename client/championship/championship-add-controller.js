(function (){
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("addChampionshipController", function($mdDialog,
    championshipHttpService){

    var _this = this;
    this.championship = new championshipHttpService.getChampionshipModel();
    this.title = "Add";
    this.disableSaveButton = false;

    this.cancel = function() {
      if(!_this.disableSaveButton)
        $mdDialog.cancel();
    };

    this.saveDialog = function() {
      _this.disableSaveButton = true;
      // Call Championship Service to add new Championship
      championshipHttpService.addChampionship(_this.championship)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

  });
})();

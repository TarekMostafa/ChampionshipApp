(function (){
  var myApp = angular.module("championshipApp");
  myApp.controller("editChampionshipController", function($mdDialog,
    championshipHttpService, selectedChampionship){

    var _this = this;

    this.cancel = function() {
      if(!_this.disableSaveButton)
        $mdDialog.cancel();
    };

    this.saveDialog = function() {
      _this.disableSaveButton = true;
      // Call Championship Service to edit Championship
      championshipHttpService.editChampionship(_this.selectedChampionship._id,_this.championshipName)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

    this.championshipName = selectedChampionship.name;
    this.title = "Edit";
    this.selectedChampionship = selectedChampionship;
    this.disableSaveButton = false;

  });
})();

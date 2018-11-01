(function (){
  var myApp = angular.module("championshipApp");
  myApp.controller("addChampionshipController", function($mdDialog,
    championshipHttpService){

    var _this = this;

    this.cancel = function() {
      if(!_this.disableSaveButton)
        $mdDialog.cancel();
    };

    this.saveDialog = function() {
      _this.disableSaveButton = true;
      // Call Championship Service to add new Championship
      championshipHttpService.addNewChampionship(_this.championshipName)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

    this.championshipName = "";
    this.title = "Add";
    this.disableSaveButton = false;

  });
})();

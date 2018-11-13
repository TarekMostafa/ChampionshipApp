(function (){
  var myApp = angular.module("championshipApp");
  myApp.controller("addTournamentController", function($mdDialog, championships,
      tournamentHttpService){

    var _this = this;
    this.championships = championships;
    this.tournament = new tournamentHttpService.getTournamentModel();
    this.selectedChampionship = null;
    this.title = "Add";
    this.disableSaveButton = false;

    this.cancel = function() {
      if(!_this.disableSaveButton)
        $mdDialog.cancel();
    };

    this.saveDialog = function() {
      _this.disableSaveButton = true;
      // Call Http put request
      tournamentHttpService.addTournament(_this.selectedChampionship._id,
        _this.tournament)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

  });
})();

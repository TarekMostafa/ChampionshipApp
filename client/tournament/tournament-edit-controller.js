(function (){
  var myApp = angular.module("championshipApp");
  myApp.controller("editTournamentController", function($mdDialog, championships,
      tournamentHttpService, selectedChampionship, selectedTournament){

    var _this = this;
    this.championships = championships;
    this.tournament = selectedTournament;
    this.selectedChampionship = selectedChampionship;
    this.title = "Edit";
    this.disableSaveButton = false;

    this.cancel = function() {
      if(!_this.disableSaveButton)
        $mdDialog.cancel();
    };

    this.saveDialog = function() {
      _this.disableSaveButton = true;
      // Call Http post request
      tournamentHttpService.editTournament(_this.selectedChampionship._id,
        _this.tournament)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

  });
})();

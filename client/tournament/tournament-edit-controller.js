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
      var editTournamentModel = new tournamentHttpService.editTournamentModel();
      editTournamentModel.championshipId = _this.selectedChampionship._id;
      editTournamentModel.tournament = _this.tournament;
      // Call Http post request
      tournamentHttpService.editTournament(editTournamentModel)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

  });
})();

(function (){
  var myApp = angular.module("championshipApp");
  myApp.controller("editTournamentController", function($mdDialog, championships,
      tournamentHttpService, selectedChampionship, selectedTournament){

    var _this = this;

    this.cancel = function() {
      if(!_this.disableSaveButton)
        $mdDialog.cancel();
    };

    this.saveDialog = function() {
      _this.disableSaveButton = true;
      var sendObj = {
        championshipId : _this.selectedChampionship._id,
        tournament:  _this.tournament
      };
      tournamentHttpService.editTournament(sendObj)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

    this.championships = championships;
    this.tournament = {
      _id: selectedTournament._id,
      name: selectedTournament.name,
      no_of_teams: selectedTournament.no_of_teams,
      year: selectedTournament.year
    }
    this.selectedChampionship = selectedChampionship;
    this.title = "Edit";
    this.disableSaveButton = false;

  });
})();

(function (){
  var myApp = angular.module("championshipApp");
  myApp.controller("addTournamentController", function($mdDialog, championships,
      tournamentHttpService){

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
      tournamentHttpService.addNewTournament(sendObj)
      .then(function(response){
        $mdDialog.hide(response.data);
      }).catch(function(err){
        $mdDialog.hide(err);
      });
    };

    this.championships = championships;
    this.tournament = {
      name: "",
      no_of_teams: 0,
      year: 0,
      current_stage: null
    }
    this.selectedChampionship = null;
    this.title = "Add";
    this.disableSaveButton = false;

  });
})();

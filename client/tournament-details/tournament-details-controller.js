(function () {
  myApp = angular.module("championshipApp");
  myApp.controller("tournamentDetailsController", function(tournament,
    championshipParamService){

    _this = this;
    this.tournament = tournament;
    this.tournamentTeams = [];
    tournament.tournament_teams.forEach(function(item, index, arr){
      _this.tournamentTeams.push(item.team);
    });
    this.groups = [];
    this.flagsServerPath = championshipParamService.flagsServerPath;

    (function () {
      if(_this.tournament.stages.length === 0) {
        return;
      }
      _this.groups = _this.tournament.current_stage.groups;
    })();

  });
})();

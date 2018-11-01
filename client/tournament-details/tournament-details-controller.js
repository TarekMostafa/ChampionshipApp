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
    this.flagsServerPath = championshipParamService.flagsServerPath;

  });
})();

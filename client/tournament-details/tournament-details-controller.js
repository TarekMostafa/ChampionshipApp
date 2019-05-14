(function () {
  myApp = angular.module("championshipApp");
  myApp.controller("tournamentDetailsController", function(championship,
    championshipParamService, _){

    _this = this;
    this.tournament = championship.tournaments[0];
    this.tournamentTeams = [];
    this.tournament.tournament_teams.forEach(function(item, index, arr){
      _this.tournamentTeams.push(item.team);
    });
    this.groups = [];
    this.flagsServerPath = championshipParamService.flagsServerPath;

    (function () {
      if(_.isNil(_this.tournament.stages) || _.isNil(_this.tournament.current_stage)) {
        return;
      }
      _this.groups = _this.tournament.current_stage.groups;
    })();

  });
})();

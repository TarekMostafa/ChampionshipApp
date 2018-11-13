(function () {
  myApp = angular.module("championshipApp");
  myApp.controller("tournamentTeamsController", function(teamHttpService,
    championshipParamService, tournamentTeamsHttpService, championship, $mdToast){

    var _this = this;
    this.tournament = championship.tournaments[0];
    this.tournamentTeams = [];
    this.tournament.tournament_teams.forEach(function(item, index, arr){
      _this.tournamentTeams.push(item.team);
    });
    this.selectedTeam = null;
    this.flagsServerPath = championshipParamService.flagsServerPath;

    this.saveTournamentTeams = function () {
      _this.tournamentTeams.forEach(function(item, index, arr){
        _this.tournament.tournament_teams.push({team:item});
      });
      tournamentTeamsHttpService.saveTournamentTeams(championship._id,
        _this.tournament._id, _this.tournament.tournament_teams)
      .then(function(response){
        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      })
      .catch(function(err){
        $mdToast.show($mdToast.simple().textContent(err).hideDelay(3000));
      })
    }

    this.queryTeams = function (queryText) {
      return teamHttpService.getTeams(queryText, '', 0,
        championshipParamService.teamsLimit)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return null;
      });
    }

    this.addTeam = function() {
      // Entered Text must be selected from drop down
      if(!_this.selectedTeam){
        return;
      }
      // Check No of teams by Tournament definition with Selected Teams
      if(_this.tournamentTeams.length >= _this.tournament.no_of_teams){
        $mdToast.show($mdToast.simple().textContent("You cant add more teams").hideDelay(3000));
        return;
      }
      // Check that team is not selected before
      if (_this.tournamentTeams.find(x => x.name === _this.selectedTeam.name)){
        $mdToast.show($mdToast.simple().textContent("This team is selected before").hideDelay(3000));
        return;
      }
      // Add Team
      _this.tournamentTeams.push(_this.selectedTeam);
      _this.selectedTeam = null;
    }

  });
})();

(function () {
  myApp = angular.module("championshipApp");
  myApp.controller("tournamentTeamsController", function(teamHttpService,
    championshipParamService, tournamentTeamsHttpService, tournament, $mdToast){

    var _this = this;
    this.tournament = tournament;
    this.tournamentTeams = [];
    tournament.tournament_teams.forEach(function(item, index, arr){
      _this.tournamentTeams.push(item.team);
    });
    this.selectedTeam = null;
    this.flagsServerPath = championshipParamService.flagsServerPath;

    this.saveTournamentTeams = function () {
      var saveTournamentTeamsModel = new tournamentTeamsHttpService.saveTournamentTeamsModel();
      saveTournamentTeamsModel.tournamentId = _this.tournament._id;
      _this.tournamentTeams.forEach(function(item, index, arr){
        saveTournamentTeamsModel.tournamentTeams.push({team:item});
      });
      tournamentTeamsHttpService.saveTournamentTeams(saveTournamentTeamsModel)
      .then(function(response){
        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      })
      .catch(function(err){
        $mdToast.show($mdToast.simple().textContent(err).hideDelay(3000));
      })
    }

    this.queryTeams = function (queryText) {
      return teamHttpService.getTeams(queryText, "", 50, 0)
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

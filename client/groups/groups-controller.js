(function () {
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("groupsController", function(tournament,
    championshipParamService, groupsHttpService, $mdToast){

    _this = this;
    this.flagsServerPath = championshipParamService.flagsServerPath;
    this.tournament = tournament;
    this.availableTeams = tournament.tournament_teams;
    this.currentStage = tournament.stages[tournament.current_stage];
    this.groups = this.currentStage.groups;
    this.selectedGroupNumber = undefined;

    (function () {
      if(_this.groups.length == 0) {
        // Set Groups
        for(let counter=0; counter < _this.currentStage.no_of_groups; counter++){
          _this.groups[counter] = {
            number: (counter+1),
            group_teams: []
          }
        }
      } else {
        // Remove Teams from availableTeams if it exist in a group
        _this.groups.forEach(function(group){
          group.group_teams.forEach(function(groupTeams){
            if(groupTeams.length === 0) return;
            _this.availableTeams = _this.availableTeams.filter(function(item){
              return item.team._id !== groupTeams.team._id;
            })
          })
        })
      }
      // Set new property selected to availableTeams
      _this.availableTeams.forEach(function(item){
        item.selected = false;
      })
    })();


    this.moveToGroup = function () {
      // Validate Selected Group Number
      if(typeof _this.selectedGroupNumber !== "number") {
        return;
      }
      // Loop through Available Teams and pick only the selected teams
      _this.availableTeams.forEach(function(item, index){
        if(item.selected) {
          var group = _this.groups[_this.selectedGroupNumber-1];
          group.group_teams.push({
            team: item.team,
            match_played: 0,
            win: 0,
            draw: 0,
            lose: 0,
            goal_for: 0,
            goal_against: 0,
            points: 0
          });
        }
      })
      // Loop through Available Teams and remove the selected teams
      _this.availableTeams = _this.availableTeams.filter(function(item){
        return !item.selected;
      })
      // Reset Selected Group
      _this.selectedGroupNumber = "";
    }

    this.removeFromGroup = function (groupNumber, index, team) {
      var group = _this.groups[groupNumber-1];
      group = group.group_teams.splice(index,1);
      _this.availableTeams.unshift({team: team, selected: false});
    }

    this.saveGroups = function () {
      var sendObj = {
        groups: _this.groups,
        tournamentId: _this.tournament._id,
        stageId: _this.currentStage._id
      }
      groupsHttpService.saveGroups(sendObj)
      .then(function(response){
        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      })
      .catch(function(err){
        $mdToast.show($mdToast.simple().textContent(err).hideDelay(3000));
      })
    }

  });
})();

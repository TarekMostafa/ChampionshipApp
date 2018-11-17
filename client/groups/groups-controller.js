(function () {
  'use strict';
  var myApp = angular.module("championshipApp");
  myApp.controller("groupsController", function(championship,
    championshipParamService, groupsHttpService, $mdToast, _){

    var _this = this;
    this.flagsServerPath = championshipParamService.flagsServerPath;
    this.tournament = championship.tournaments[0];
    this.availableTeams = this.tournament.tournament_teams;
    this.groups = [];
    this.selectedGroupNumber = undefined;

    function setGroups() {
      if(_this.groups.length === 0) {
        // New Groups
        for(let counter=0; counter < _this.tournament.current_stage.no_of_groups; counter++){
          _this.groups[counter] = {
            number: (counter+1),
            group_teams: []
          }
        }
      } else {
        // Old Groups saved before
        // Remove Teams from availableTeams if it exists in a group
        _this.groups.forEach(function(group){
          group.group_teams.forEach(function(groupTeams){
            if(groupTeams.length === 0) return;
            _this.availableTeams = _this.availableTeams.filter(function(item){
              return item.team._id !== groupTeams.team._id;
            })
          })
        })
      }
    }

    (function () {
      if(!_.isNil(_this.tournament.current_stage)) {
        _this.groups = _this.tournament.current_stage.groups;
        setGroups();
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
          var groupTeamModel = new groupsHttpService.getGroupTeamModel();
          groupTeamModel.team = item.team;
          var group = _this.groups[_this.selectedGroupNumber-1];
          group.group_teams.push(groupTeamModel);
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
      // Call Http post request
      groupsHttpService.saveGroups(championship._id, _this.tournament._id,
        _this.tournament.current_stage._id, _this.groups)
      .then(function(response){
        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      })
      .catch(function(err){
        $mdToast.show($mdToast.simple().textContent(err).hideDelay(3000));
      })
    }

  });
})();

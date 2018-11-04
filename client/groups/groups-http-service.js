(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("groupsHttpService", function($http){

    this.getGroupTeamModel = function () {
      this.team = "";
      this.match_played = 0;
      this.win = 0;
      this.draw = 0;
      this.lose = 0;
      this.goal_for = 0;
      this.goal_against = 0;
      this.points = 0;
    }

    this.saveGroupsModel = function () {
      this.groups = [];
      this.tournamentId = "";
      this.stageId = "";
    }

    this.saveGroups = function (saveGroupsModel){
      return $http({
        url: '/groups',
        method: 'POST',
        dataType: 'json',
        data: {
          saveGroupsModel: saveGroupsModel
        }
      });
    }

  });
})();

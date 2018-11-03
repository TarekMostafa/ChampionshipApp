(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("groupsHttpService", function($http){

    this.getGroupsViewModel = function () {
      return {
        groups: [],
        tournamentId: "",
        stageId: ""
      }
    }

    this.saveGroups = function (groupsViewModel){
      return $http({
        url: '/groups',
        method: 'POST',
        dataType: 'json',
        data: {
          groupsObj: groupsViewModel
        }
      });
    }

  });
})();

(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("groupsHttpService", function($http){

    this.saveGroups = function (inGroupsObj){
      return $http({
        url: '/groups',
        method: 'POST',
        dataType: 'json',
        data: {
          groupsObj: inGroupsObj
        }
      });
    }

  });
})();

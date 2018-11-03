(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("stagesHttpService", function($http){

    this.getStagesViewModel = function () {
      return {
        tournamentId: "",
        stages: []
      }
    }

    this.saveStages = function (stagesViewModel){
      return $http({
        url: '/stages',
        method: 'POST',
        dataType: 'json',
        data: {
          stagesObj: stagesViewModel
        }
      });
    }

  });
})();

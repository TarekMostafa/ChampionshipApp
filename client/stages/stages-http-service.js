(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("stagesHttpService", function($http){

    this.saveStages = function (inStagesObj){
      return $http({
        url: '/stages',
        method: 'POST',
        dataType: 'json',
        data: {
          stagesObj: inStagesObj
        }
      });
    }

  });
})();

(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("championshipHttpService", function($http){

    this.getChampionshipViewModel = function () {
      return {
        _id: "",
        name: ""
      };
    }

    this.addChampionship = function (championship){
      // Return Http PUT Request
      return $http({
        url: '/championship',
        method: 'PUT',
        dataType: 'json',
        data: {
          championship: championship
        }
      });
    }

    this.editChampionship = function (championship){
      // Return Http POST Request
      return $http({
        url: '/championship',
        method: 'POST',
        dataType: 'json',
        data: {
          championship: championship
        }
      });
    }

    this.getChampionships = function (){
      return $http({
        url: '/championship',
        method: 'GET',
      });
    }

  });
})();

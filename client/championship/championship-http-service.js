(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("championshipHttpService", function($http){

    this.addChampionshipModel = function () {
      this.name = "";
    }

    this.addChampionship = function (addChampionshipModel){
      // Return Http PUT Request
      return $http({
        url: '/championship',
        method: 'PUT',
        dataType: 'json',
        data: {
          addChampionshipModel: addChampionshipModel
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

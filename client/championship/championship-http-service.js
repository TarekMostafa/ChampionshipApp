(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("championshipHttpService", function($http){

    this.addNewChampionship = function (inChampionshipName){
      // Initialize Championship Data
      var championshipData = {};
      championshipData.name = inChampionshipName;
      // Return Http PUT Request
      return $http({
        url: '/championship',
        method: 'PUT',
        dataType: 'json',
        data: {
          championship: championshipData
        }
      });
    }

    this.editChampionship = function (inChampionshipId, inChampionshipName){
      // Initialize Championship Data
      var championshipData = {};
      championshipData._id = inChampionshipId;
      championshipData.name = inChampionshipName;
      // Return Http POST Request
      return $http({
        url: '/championship',
        method: 'POST',
        dataType: 'json',
        data: {
          championship: championshipData
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

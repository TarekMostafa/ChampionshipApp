(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("championshipHttpService", function($http){

    this.getChampionshipModel = function () {
      this.name = "";
    }

    this.addChampionship = function (championship){
      // Return Http PUT Request
      return $http({
        url: '/championship',
        method: 'PUT',
        dataType: 'json',
        data: {
          name: championship.name
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
          _id: championship._id,
          name: championship.name
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

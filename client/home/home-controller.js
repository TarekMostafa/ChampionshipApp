(function (){
  myApp = angular.module("championshipApp");
  myApp.controller("homePageController", function (championshipHttpService){

    var _this = this;

    this.loadChampionships = function () {
      _this.loading = true;
      championshipHttpService.getChampionships()
      .then(function(response){
        _this.championships = response.data;
        _this.loading = false;
      }).catch(function(err){
        _this.loading = false;
      });
    };

    this.championships = [];
    this.loading = false;
    this.loadChampionships();

  })
})();

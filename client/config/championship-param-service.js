(function () {
  var myApp = angular.module("championshipApp");
  myApp.service("championshipParamService", function(){
    this.flagsServerPath = "/client/static/countries-images/normal/";
    this.teamsLimit = 18;
  });
})();

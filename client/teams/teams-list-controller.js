(function () {
  var myApp = angular.module("championshipApp");
  myApp.controller("teamsListPageController", function(championshipParamService,
    teamHttpService){

    var _this = this;

    // Load Teams when more button submitted
    this.loadTeams = function (){
      _this.loading = true;
      _this.message = "";
      // Call Teams $http
      teamHttpService.getTeams(_this.enteredTeam, _this.selectedContinent, 18, _this.teams.length)
      .then(function(response){
        _this.teams.push.apply(_this.teams, response.data);
        _this.loading = false;
        if(response.data.length < 18){
          _this.showMoreBtn = false;
        }
      }).catch(function(err){
        _this.message = err.statusText;
        _this.loading = false;
      });
    }

    // Reset Teams and reload it when any text entered in Team name or
    // continent selected from the list
    this.reloadTeams = function(){
      _this.teams = [];
      _this.showMoreBtn = true;
      _this.loadTeams();
    }

    // Hold Teams
    this.teams = [];
    // Hold Continents
    this.continents = [];
    // This variable responsible for Teams View 'Card' or 'Table'
    // by default it is 'Card'
    this.isViewTable = 'Card';
    // Selected Continent for search
    this.selectedContinent = "";
    // Entered letters for Team name search
    this.enteredTeam = "";
    // Responsible for appearing Progress Circular while loading...
    this.loading = false;
    // Teams Flags Server Path
    this.flagsServerPath = championshipParamService.flagsServerPath;
    // Responsible for appearing More button
    this.showMoreBtn = true;
    // Hold any controller message
    this.message = "";

    // Load Continents Array
    (function (){
      teamHttpService.getTeamsContinents()
      .then(function(response){
        _this.continents.push.apply(_this.continents, response.data);
      }).catch(function(err){
        _this.message = err.statusText;
        _this.showMoreBtn = false;
      });
    })();

    this.loadTeams();

  });
})();

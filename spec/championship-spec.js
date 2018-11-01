var request = require("request");
var base_url = "http://localhost:3000/";

describe("Teams", function(){
  var teams = require('../server/teams/teams-db');

  it("should return world continents = 6", function(done){
    teams.getTeamsContinents(function(err, continents){
      expect(continents.length).toBe(6);
      done();
    });
  });

  it("should return status 200 if called continent from URL", function(done){
    request.get(base_url+'teams/continents', function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("should return Germany team if teamName = Germany", function(done){
    teams.getTeams('Germany', '', 10, 0, function(err, data){
      expect(data).toMatch('Germany');
      done();
    })
  });

  it("should return Asia teams if continent = Asia", function(done){
    teams.getTeams('', 'Asia', 1, 0, function(err, data){
      expect(data).toMatch('Asia');
      done();
    })
  });

  it("should return 20 teams if limit = 20 and skip = 5", function(done){
    teams.getTeams('', '', 20, 5, function(err, data){
      expect(data.length).toBe(20);
      done();
    })
  });

  it("should return status 200 if called teams from URL", function(done){
    request.get(base_url+'teams?teamName=Egypt&continent=&limit=10&skip=2', function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

});

describe("Championship", function(){
  var championship = require('../server/championship/championship-db');

  it("add Euro Cup as Championship", function(done){
    championship.addChampionship({name:"Euro Cup"}, function(err){
      expect(err).toBeNull();
      done();
    });
  });

  it("should return all championships including Euro Cup", function(done){
    championship.getChampionships(function(err, championships){
      expect(championships).toMatch("Euro Cup");
      done();
    });
  });

  it("request to add Africa Nations from URL", function(done){
    request({ url:base_url+'championship', method:'PUT',
      json:{championship:{name:'Africa Nations'}}}, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get Africa Nations from URL", function(done){
    request({ url:base_url+'championship', method:'GET'},
      function(err, response, body){
      expect(response.statusCode).toBe(200);
      expect(body).toMatch('Africa Nations');
      done();
    });
  });

});

describe("Tournament", function(){
  var championship = require('../server/championship/championship-db');
  var tournament = require('../server/tournament/tournament-db');

  it("add new tournament to a specific championship", function(done){
    championship.getChampionships(function(err, championships){
      var addTournamentObj = {
        championshipId: championships[0]._id,
        tournament: {name:'Ukraine 2018', no_of_teams:32, year:2018}
      }
      tournament.addTournament(addTournamentObj, function(err2){
        expect(err2).toBeNull();
        done();
      });
    });
  });

  it("request to add new tournament from URL", function(done){
    championship.getChampionships(function(err, championships){
      var tournamentObj = {
        championshipId: championships[1]._id,
        tournament: {name:'Algeria 2014', no_of_teams:16, year:2014}
      };
      request({ url:base_url+'tournament', method:'PUT',
        json:{tournamentObj}},function(err, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

})

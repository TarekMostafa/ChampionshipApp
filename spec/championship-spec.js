var request = require('request');
var _ = require('lodash');
var base_url = "http://localhost:3000/";

var championship = {};
var tournament = {};

describe("Add Championship", function(){

  it("request to add championship without data parameters", function(done){
    request({ url:base_url+'championship', method:'PUT'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it("request to add championship", function(done){
    request({ url:base_url+'championship', method:'PUT',
      json:{name:'Africa Nations'}}, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get the added championship", function(done){
    request({ url:base_url+'championship', method:'GET'},
      function(err, response, body){
      expect(response.statusCode).toBe(200);
      championship = _.find(JSON.parse(body), {'name':'Africa Nations'});
      expect(championship.name).toEqual('Africa Nations');
      done();
    });
  });
});

describe("Edit Championship", function(){

  it("request to edit championship without data parameters", function(done){
    request({ url:base_url+'championship', method:'POST'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it("request to edit championship", function(done){
    request({ url:base_url+'championship', method:'POST',
    json:{'_id': championship._id, 'name': 'Africa Cup Nations'}},
    function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get the updated championship", function(done){
    request({ url:base_url+'championship', method:'GET'},
      function(err, response, body){
      expect(response.statusCode).toBe(200);
      championship = _.find(JSON.parse(body), {'name':'Africa Cup Nations'});
      expect(championship.name).toEqual('Africa Cup Nations');
      done();
    });
  });
});

describe("Add Tournament", function(){

  it("request to add tournament without data parameters", function(done){
    request({ url:base_url+'tournament', method:'PUT'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  })

  it("request to add tournament to non-existing championship", function(done){
    request({ url:base_url+'tournament', method:'PUT', json:{
        championshipId: "5becae5ff43f583beca02664", tournament: {name: "Non Exist",
        no_of_teams: 1, year: 2000}
      }
    }, function(err, response, body){
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it("request to add tournament to existing championship", function(done){
    request({ url:base_url+'tournament', method:'PUT', json:{
        championshipId: championship._id, tournament: {name: "Tunisia 2014",
        no_of_teams: 4, year: 2014}
      }
    }, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get added Tournament", function(done){
    request({ url:base_url+'championship', method:'GET'},
      function(err, response, body){
      expect(response.statusCode).toBe(200);
      let championships = JSON.parse(body);
      tournament = _.find(championships[0].tournaments, {'name':'Tunisia 2014'});
      expect(tournament.name).toEqual('Tunisia 2014');
      done();
    });
  });
});

describe("Edit Tournament", function(){

  it("request to edit tournament without data parameters", function(done){
    request({ url:base_url+'tournament', method:'POST'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  })

  it("request to edit tournament to non-existing championship", function(done){
    request({ url:base_url+'tournament', method:'POST', json:{
        championshipId: "5becae5ff43f583beca02664", tournament: {
        _id:tournament._id, name: "Non Exist",
        no_of_teams: 1, year: 2000}
      }
    }, function(err, response, body){
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it("request to edit tournament to existing championship", function(done){
    request({ url:base_url+'tournament', method:'POST', json:{
        championshipId: championship._id, tournament: {
        _id:tournament._id, name: "Tunisia 2018",
        no_of_teams: 3, year: 2018}
      }
    }, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get the updated Tournament", function(done){
    request({ url:base_url+'tournament?championshipId='+championship._id+
    '&tournamentId='+tournament._id, method:'GET'},
    function(err, response, body){
      expect(response.statusCode).toBe(200);
      let championships = JSON.parse(body);
      tournament = _.find(championships.tournaments, {'name':'Tunisia 2018'});
      expect(tournament.name).toEqual('Tunisia 2018');
      done();
    });
  });
});

describe("Save Tournament Teams", function(){

  it("request to save tournament teams without data parameters", function(done){
    request({ url:base_url+'tournament-teams', method:'POST'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it("request to save tournament teams to non existing Championship", function(done){
    var tournamentTeams = [];
    tournamentTeams.push({team: {_id:1, name:"Algeria", continent:"Africa"}});
    request({ url:base_url+'tournament-teams', method:'POST', json: {
      championshipId: "5becae5ff43f583beca02664",
      tournamentId: tournament._id,
      tournamentTeams: tournamentTeams }
    }, function(err, response, body){
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it("request to save stages to existing Championship", function(done){
    var tournamentTeams = [];
    tournamentTeams.push({team: {_id:1, name:"Algeria", continent:"Africa"}});
    tournamentTeams.push({team: {_id:2, name:"Tunisia", continent:"Africa"}});
    tournamentTeams.push({team: {_id:3, name:"Morocco", continent:"Africa"}});
    request({ url:base_url+'tournament-teams', method:'POST', json: {
      championshipId: championship._id,
      tournamentId: tournament._id,
      tournamentTeams: tournamentTeams }
    }, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get the updated Tournament", function(done){
    request({ url:base_url+'tournament?championshipId='+championship._id+
    '&tournamentId='+tournament._id, method:'GET'},
    function(err, response, body){
      expect(response.statusCode).toBe(200);
      let championships = JSON.parse(body);
      tournament = _.find(championships.tournaments, {'name':'Tunisia 2018'});
      expect(tournament.name).toEqual('Tunisia 2018');
      expect(tournament.tournament_teams.length).toBe(3);
      done();
    });
  });
});

describe("Save Tournament Stages", function(){

  it("request to save stages without data parameters", function(done){
    request({ url:base_url+'stages', method:'POST'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it("request to save stages to non existing Championship", function(done){
    var stages = [];
    stages.push({_id:1, name: "Semi Final", type: "Knockout", no_in_teams: 4,
                no_out_teams: 2, no_of_groups: 2, no_of_legs: 1});
    stages.push({_id:2, name: "Final", type: "Knockout", no_in_teams: 2,
                no_out_teams: 1, no_of_groups: 1, no_of_legs: 1});
    request({ url:base_url+'stages', method:'POST', json: {
      championshipId: "5becae5ff43f583beca02664",
      tournamentId: tournament._id,
      stages: stages }
    }, function(err, response, body){
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it("request to save stages to existing Championship", function(done){
    var stages = [];
    stages.push({_id:1, name: "Semi Final", type: "Knockout", no_in_teams: 4,
                no_out_teams: 2, no_of_groups: 2, no_of_legs: 1});
    stages.push({_id:2, name: "Final", type: "Knockout", no_in_teams: 2,
                no_out_teams: 1, no_of_groups: 1, no_of_legs: 1});
    request({ url:base_url+'stages', method:'POST', json: {
      championshipId: championship._id,
      tournamentId: tournament._id,
      stages: stages }
    }, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get the updated Tournament", function(done){
    request({ url:base_url+'tournament?championshipId='+championship._id+
    '&tournamentId='+tournament._id, method:'GET'},
    function(err, response, body){
      expect(response.statusCode).toBe(200);
      let championships = JSON.parse(body);
      tournament = _.find(championships.tournaments, {'name':'Tunisia 2018'});
      expect(tournament.name).toEqual('Tunisia 2018');
      expect(tournament.stages.length).toBe(2);
      done();
    });
  });
});

describe("Save Tournament Groups", function(){

  it("request to save groups without data parameters", function(done){
    request({ url:base_url+'groups', method:'POST'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it("request to save groups to non existing Championship", function(done){
    var groups = [];
    groups.push({number: 1, group_teams: [], group_matches: []});
    groups.push({number: 2, group_teams: [], group_matches: []});
    request({ url:base_url+'groups', method:'POST', json: {
      championshipId: "5becae5ff43f583beca02664",
      tournamentId: tournament._id,
      stageId: tournament.current_stage._id,
      groups: groups}
    }, function(err, response, body){
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it("request to save groups to existing Championship", function(done){
    var groups = [];
    groups.push({number: 1, group_teams: [], group_matches: []});
    groups.push({number: 2, group_teams: [], group_matches: []});
    request({ url:base_url+'groups', method:'POST', json: {
      championshipId: championship._id,
      tournamentId: tournament._id,
      stageId: tournament.current_stage._id,
      groups: groups}
    }, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get the updated Tournament", function(done){
    request({ url:base_url+'tournament?championshipId='+championship._id+
    '&tournamentId='+tournament._id, method:'GET'},
    function(err, response, body){
      expect(response.statusCode).toBe(200);
      let championships = JSON.parse(body);
      tournament = _.find(championships.tournaments, {'name':'Tunisia 2018'});
      expect(tournament.name).toEqual('Tunisia 2018');
      expect(tournament.current_stage.groups.length).toBe(2);
      done();
    });
  });
});

describe("Delete Championship", function(){

  it("request to delete championship without data parameters", function(done){
    request({ url:base_url+'championship', method:'DELETE'},
    function(err, response, body){
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it("request to delete championship", function(done){
    request({ url:base_url+'championship', method:'DELETE',
    json:{'_id': championship._id}}, function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

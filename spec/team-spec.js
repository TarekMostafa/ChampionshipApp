var request = require('request');
var base_url = "http://localhost:3000/";

describe("Teams", function(){

  it("request to get teams continents", function(done){
    request.get(base_url+'teams/continents', function(err, response, body){
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(body).length).toBe(6);
      done();
    });
  });

  it("request to get teams with out query parameters", function(done){
    request.get(base_url+'teams', function(err, response, body){
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("request to get specific team", function(done){
    request.get(base_url+'teams?name=Egypt', function(err, response, body){
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(body).length).toBe(1);
      expect(body).toMatch('Egypt');
      done();
    });
  });

  it("request to get teams in Asia", function(done){
    request.get(base_url+'teams?continent=Asia', function(err, response, body){
      expect(response.statusCode).toBe(200);
      expect(body).toMatch('Asia');
      done();
    });
  });

  it("request to get Germany team in Asia", function(done){
    request.get(base_url+'teams?name=Germany&continent=Asia', function(err, response, body){
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(body).length).toBe(0);
      done();
    });
  });

  it("request to get 10 teams", function(done){
    request.get(base_url+'teams?limit=10', function(err, response, body){
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(body).length).toBe(10);
      done();
    });
  });

});

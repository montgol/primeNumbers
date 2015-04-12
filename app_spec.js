var expect = require('chai').expect;
var app = require('../app.js');


describe("app", function() {

  describe("Is Prime", function() {
    it('checks if a number is prime', function() {
      expect(app.checkIfPrime(5)).to.equal(true);
    });
 
    it('checks if a number is prime', function() {
      expect(app.checkIfPrime(4)).to.equal(false);
    });
  });
  
});
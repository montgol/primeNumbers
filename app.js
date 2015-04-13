var redis = require('redis');
var client = redis.createClient(6379, '10.0.1.150');
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

client.on('error', function (err) {
	console.log('Error ' + err);
});

// 1) Read in maxNum for the Prime Numbers

var checkIfPrime = function(number) {
    var start = 2;
    var isPrime;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return true;
};

// 2) Create a function to get all prime numbers up to maxNum

var getAllPrimes = function() {

};

// 3) Ask user for lower/upper bound
// 4) Find prime numbers between bounds
// 5) Calculate Sum of Primes
// 6) Calculate Mean of Primes
// 7) Repeatedly ask user for bounds

var execPrimes = function() {

};

// 8) Remember testing

module.exports = {checkIfPrime:checkIfPrime, getAllPrimes:getAllPrimes}

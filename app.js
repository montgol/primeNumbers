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
// 2) Create a function to check if a number is Prime

var checkIfPrime = function() {

};

// 3) Create a function to get all prime numbers up to maxNum

var getAllPrimes = function() {

};

// 4) Ask user for lower/upper bound
// 5) Find prime numbers between bounds
// 6) Calculate Sum of Primes
// 7) Calculate Mean of Primes
// 8) Repeatedly ask user for bounds

var execPrimes = function() {

};

// 9) Remember testing
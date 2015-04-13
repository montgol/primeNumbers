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

var maxNum = process.argv[2];
console.log(maxNum);

var checkIfPrime = function(number) {
    var start = 2;
    var isPrime;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return true;
};

var getAllPrimes = function(num) {
	var num = parseInt(num);
	if (num > 2){
		client.del('primes');
		client.rpush('primes', 2);
		// increase i by 2 since all even numbers are not prime
		for(var i = 3; i <= num; i = i + 2) {  
		  if(checkIfPrime(i)){
		    client.rpush('primes', i);
		  }
		}
	}
};
// 1) Calculate Mean of Primes
// 2) Repeatedly ask user for bounds

var execPrimes = function() {
	rl.question("Enter a lower bound: ", function(lb) {
		var lower = parseInt(lb);
		rl.question("Enter an upper bound: ", function(ub) {
			var upper = parseInt(ub);
			var subsetPrimes = [];
			console.log('Result:');
			client.lrange('primes', 0, -1, function(err, num) {
				if (err) throw err;
				num.forEach(function(reply){
					if ((reply >= lb) && (reply <= ub)){
						subsetPrimes.push(reply);
					}
				});
				console.log("Prime numbers: [" + subsetPrimes + "]");
			});
		});
	});
};

getAllPrimes(maxNum);
execPrimes();

module.exports = {checkIfPrime:checkIfPrime, getAllPrimes:getAllPrimes}

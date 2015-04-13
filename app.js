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
var repeat = true;

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
					var reply = parseInt(reply);
					if ((reply >= lower) && (reply <= upper)){
						subsetPrimes.push(reply);
					}
				});
				console.log("Prime numbers: [" + subsetPrimes + "]");
				var sumPrimes = subsetPrimes.reduce(function(a, b){return parseInt(a)+parseInt(b);});
				console.log("Sum: ", sumPrimes);
				var meanPrimes = sumPrimes / subsetPrimes.length;
				console.log("Mean: ", meanPrimes);

				rl.question("Enter new bounds? Y/N ", function(repeat) {
					if ((repeat == "Y") || (repeat == "y")) {
						execPrimes();
					} else {
						process.exit();
					}
				});
			});
		});
	});
};

getAllPrimes(maxNum);
execPrimes();

module.exports = {checkIfPrime:checkIfPrime, getAllPrimes:getAllPrimes}

function largestPrimeFactor(number) {
    // Good luck!
    let primes = [];
    let res = 1;
    for (let i = 2; i <= number/res; i++){
      if (number % i === 0 && primes.every(el => i % el !== 0)) {
        primes.push(i);
        res = i;
      }
    }
    return res;
}

let a = largestPrimeFactor(600851475143);
console.log(a);
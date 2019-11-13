function nthPrime(n) {
    // Good luck!
    let arr = [];
    let res = 0;
    let nth = 0;
    let i = 2;
    while(nth !== n){
      if (arr.every(el => i%el !== 0)){
        arr.push(i);
        res = i;
        nth++;
      }
      i++;
    }
    return res;
}

nthPrime(100);

// let arr = [];
// console.log(undefined%2 !== 0);

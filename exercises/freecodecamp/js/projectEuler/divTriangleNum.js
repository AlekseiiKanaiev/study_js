function divisibleTriangleNumber(n) {
    // Good luck!
    if (n === 1){
        return 1
    }
    let number = ((n-1) + (n-1)**2)/2;
    let inc = n;
    let div = 0;
    function divs(num){
        let divisors = {}
        let res = 1;
        let i = 2;
        while(num !== 1){
            if (num % i === 0){
                (divisors[i]) ? divisors[i]++ : divisors[i] = 1;
                num /= i;
            } else {
                i++;
            }
            
        }
        console.log(divisors);
        for (let val of Object.values(divisors)){
            res *= (val+1);
        }
        return res;
    }
    while (div < n){
        number += inc++;
        div = divs(number);
    }
    
    return number;
}
  
let a = divisibleTriangleNumber(500);
console.log(a);

// let d = new Map();
// d[1] = 2;
// console.log(d[1]);
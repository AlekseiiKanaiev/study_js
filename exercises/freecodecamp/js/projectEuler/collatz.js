function longestCollatzSequence(limit) {
    // Good luck!
    if (limit < 2){
        return 1
    }
    if (limit === 2) {
        return 2
    }
    let res = 0;
    let longest = 0;
    for (let num = 3; num < limit; num += 2){
        let terms = 1;
        let number = num
        while (number !== 1) {
            if (number % 2 === 0){
                number /= 2;
            } else {
                number = 3*number + 1;
            }
            terms++;
            if (terms > longest){
                longest = terms;
                res = num;
            } 
        }
    }
    return res;
  }
  
let a = longestCollatzSequence(1000000);
console.log(a);
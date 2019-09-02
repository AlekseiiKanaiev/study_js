function pow(a, n){
    if (n === 0){
        return 1;
    }
    else if (n < 0){
        return 'Not supported';
    }
    let r = a
    // while (n > 1){
    //     r *= a;
    //     n--;
    // }
    return r*pow(a, n-1);
}

function pow2(a, n){
    if (n === 0){
        return 1;
    }
    else if (n < 0){
        return 'Not supported';
    }
    return a*pow(a, n-1);
}

let a = 2, n = 0;
console.log(pow(a, n));
console.log(pow2(a, n));
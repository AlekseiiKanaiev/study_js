function largestPalindromeProduct(n) {
    // Good luck!
    let num = Math.pow(10, n)-1;
    let res = '';
    for (let i = num; i >= 1; i--){
        for (let j = num; j >= 1; j--){
            let p = (i*j).toString();
            if (p.slice(0,n) === p.slice(n).split('').reverse().join('') && p > res) res = p;
        }
    }
    return +res;
}

let a = largestPalindromeProduct(3);
console.log(a);
// let a = 906609;
// for (let i = 999; i >=1 ; i--){
//     if (a % i === 0){
//         console.log('1: '+i);
//         console.log('2: '+a/i);
//     }
// }

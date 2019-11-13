function smallestMult(n) {
    // Good luck!
    let arr = [];
    for (let i = 2; i <= n; i++){
        arr.push(i)
    }
    console.log(arr);
    let res = n;
    for (let i = n-1; i >=2; i--){
        if (res % i !== 0){
            res *= i;
            console.log(i, res);
        }
    }
    let max = 1;
    arr.forEach(el => {
        if (arr.every(num => res/el % num === 0) && el > max) max = el;
    })
    console.log(max);
    return res/max;
}
  
let a = smallestMult(5);
console.log(a);
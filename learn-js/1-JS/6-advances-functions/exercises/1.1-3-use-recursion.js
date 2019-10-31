
function sumTo(n){
    return (n===1) ? n : n + sumTo(n - 1);
}

console.log(sumTo(100));

//factorial

function factorial(n){
    return (n === 0) ? 1 : n * factorial(n-1);
}

console.log(factorial(5));

//fibonachi
function fib(n){
    //this interpritation will use many resources for large number (for example 77)
    // return (n === 0)? 0 : (n <= 2)? 1 : fib(n-1) + fib(n-2);
    //this variation use mauch less resources
    let a = 1;
    let b = 1;
    let res = 0;
    if (n === 0) return 0;
    else if (n <= 2) return a;
    else {
        for (let i = 3; i <= n; i++){
            res = a + b;
            [a, b] = [b, res];
        }
    }
    return res;
}

console.log(fib(5));


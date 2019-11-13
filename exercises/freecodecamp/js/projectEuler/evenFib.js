function fiboEvenSum(num) {
    // You can do it!
    let res = 0;
    for (let i = 0, n = 0, m = 1; i < num; i++){
        [n, m] = [m, (n + m)];
        // console.log(m);
        if (m % 2 === 0) res += m;
    }
    console.log(res)
    return res;
}

fiboEvenSum(10);

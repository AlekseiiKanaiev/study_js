function pairwise(arr, arg) {
    let res = [];
    for (let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] + arr[j] === arg && !res.includes(i) && !res.includes(j)){
                res.push(...[i, j]);
            }
        }
    }
    // console.log(res);
    // console.log(res.reduce((a, b) => a + b, 0));
    return res.reduce((a, b) => a + b, 0);
}

pairwise([1, 4, 2, 3, 0, 5], 7);
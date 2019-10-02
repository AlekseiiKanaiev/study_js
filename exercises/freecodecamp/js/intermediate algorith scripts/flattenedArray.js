function steamrollArray(arr, n = 0) {

    // I'm a steamroller, baby
    let res = arr.slice();
    if (n > 0){
        for (let i = 0; i < n; i++){
            res = res.reduce((acc, val) => acc.concat(val), [])
        }
    }
    else {
        while(res.some(el => Array.isArray(el))){
            res = res.reduce((acc, val) => acc.concat(val), [])
        }
    }
    return res;
  }
  
let a = steamrollArray([1, [2], [3, [[4]]]]);
console.log(a)

Array.prototype.flat = (n = 0) => {
    let res = arr.slice();
    if (n > 0){
        for (let i = 0; i < n; i++){
            res = res.reduce((acc, val) => acc.concat(val), [])
        }
    }
    else {
        while(res.some(el => Array.isArray(el))){
            res = res.reduce((acc, val) => acc.concat(val), [])
        }
    }
    return res;
}

let arr = [1, 2, [5, 6]]
console.log(arr.flat());
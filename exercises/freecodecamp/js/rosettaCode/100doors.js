function getFinalOpenedDoors(numDoors) {
    // Good luck!
    let res = {};
    for (let i = 1; i <= numDoors; i++){
      for (let j = i; j <= numDoors; j += i){
        (res[j] === 'open') ? res[j] = 'close' : res[j] = 'open';
      }
    //   console.log(res);
    }
    return Object.keys(res).filter(el => res[el] === 'open').map(el => +el)
}

// After getting results its appears:

function getFinalOpenedDoors2(doors){
    let res = [];
    for (let i = 1; i <= doors; i++){
        res.push(i);
    }
    return res.filter(el => Math.sqrt(el) % 1 === 0)
}

console.log(getFinalOpenedDoors(100));
console.log(getFinalOpenedDoors2(100));

// let a = {
//     1: 0,
//     2: 1,
//     3: 0,
// }

// console.log(Object.keys(a).filter( el => a[el] == 0));
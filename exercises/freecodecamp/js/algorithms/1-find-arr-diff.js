function sym() {
    let mySet = new Set();
    let arr = [...arguments];
    let res = [];
    arr.forEach(el => el.forEach(num => mySet.add(num)))
    for (num of mySet){
        if (arr.filter(el => el.includes(num)).length === 1) {
            res.push(num);
        } 
    }
    return res.sort((a, b) => a > b);
}

function sym2(){
    let mySet = new Set();
    [...arguments].forEach(el => [...(new Set(el))].forEach(num => (mySet.has(num)) ? mySet.delete(num) : mySet.add(num)))
    return Array.from(mySet);
}

const diff = (arr1, arr2) => [
    ...arr1.filter(e => !arr2.includes(e)),
    ...arr2.filter(e => !arr1.includes(e))
  ];
  
const sym3 = (...args) => [...new Set(args.reduce(diff))];

// test here
console.log(sym([1, 2, 3], [5, 2, 1, 4]));
console.log(sym([1, 2, 3, 3], [5, 2, 1, 4]));
console.log(sym([1, 2, 5], [2, 3, 5], [3, 4, 5]));
console.log();
console.log(sym2([1, 2, 3], [5, 2, 1, 4]));
console.log(sym2([1, 2, 3, 3], [5, 2, 1, 4]));
console.log(sym2([1, 2, 5], [2, 3, 5], [3, 4, 5]));
console.log();
console.log(sym3([1, 2, 3], [5, 2, 1, 4]));
console.log(sym3([1, 2, 3, 3], [5, 2, 1, 4]));
console.log(sym3([1, 2, 5], [2, 3, 5], [3, 4, 5]));

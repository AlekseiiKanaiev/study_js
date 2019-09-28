function largestOfFour(arr) {
// You can do this!
    return arr.map(el => Math.max(...el));
}

let res = largestOfFour([[4, 10, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
console.log(res)

let str = 'Hello';
console.log(str.length);
console.log(str.slice(0,2));